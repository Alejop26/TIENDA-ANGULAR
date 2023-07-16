import express from 'express';
import Product from '../models/product.models.js';
import Inventory from '../models/inventory.model.js';
import ProductImage from '../models/productImages.model.js';
import cloudinary from '../controllers/cloudinary.js';
import multer from 'multer';
import ShoppingCart from '../models/cart.models.js';
import fs from 'fs';

const upload = multer();
const productRouter = express.Router();

// GET

// Obtain all products with their corresponding images
productRouter.get('/', async (req, res) => {
	try {
		const products = await Product.findAll();

		const productsWithImages = await Promise.all(
			products.map(async (product) => {
				const productImages = await ProductImage.findAll({
					where: { productID: product.productID },
				});
				if (productImages.length === 0) {
					return { ...product.dataValues, productImages: [] };
				}
				return { ...product.dataValues, productImages };
			})
		);
		if (productsWithImages.length === 0) {
			return res.status(404).json({ message: 'Products not found' });
		}
		res.status(200).json(productsWithImages);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error retrieving products' });
	}
});

// Obtener un producto por su ID con sus imagenes
productRouter.get('/:productID', async (req, res) => {
	try {
		const productID = req.params.productID;
		const product = await Product.findByPk(productID);
		const productImages = await ProductImage.findAll({
			where: { productID },
		});
		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}
		res.status(200).json({ ...product.dataValues, productImages });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error al obtener el producto' });
	}
});

// POST

// Create a new Product with its corresponding ProductImage and Inventory records
productRouter.post('/', upload.single('image'), async (req, res) => {
	try {
		const { productName, description, price } = req.body;
		const imageFile = req.file;

		// Validate that an image file was uploaded
		if (!imageFile) {
			return res.status(400).json({ message: 'No image file provided' });
		}

		// Save the image file in the uploads folder
		const tempFilePath = `./uploads/${imageFile.originalname}`;
		fs.writeFileSync(tempFilePath, imageFile.buffer);

		// Upload the image file to Cloudinary
		const result = await cloudinary.uploader.upload(tempFilePath, {
			folder: 'NIKE-STORE/products',
			transformation: [{ width: 800, height: 600, crop: 'fill' }],
		});

		// Delete the image file from the uploads folder
		fs.unlinkSync(tempFilePath);

		const imageURL = result.secure_url;

		if (!imageURL) {
			return res.status(500).json({
				message:
					'Error uploading image to Cloudinary or obtaining the image URL',
			});
		}

		// Create a new Product record in the database
		const product = await Product.create({
			productName,
			description,
			price,
		});

		// Create a new ProductImage record in the database
		await ProductImage.create({
			productID: product.productID,
			isFront: 1,
			imageURL,
		});

		// Create a new Inventory record in the database
		await Inventory.create({
			productID: product.productID,
			quantity: 10,
			stockMin: 0,
			stockMax: 200,
		});

		res.status(201).json({ message: 'Product created', product });
	} catch (error) {
		console.error('Error creating product:', error);
		res.status(500).json({ message: 'Error creating product' });
	}
});

// PUT

// Update a Product record
productRouter.put('/:productID', async (req, res) => {
	try {
		const { productName, description, price } = req.body;
		const productID = req.params.productID;
		const imageFile = req.file;

		const product = await Product.findByPk(productID);

		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}
		// If an image file is uploaded, update the image in Cloudinary and save the new imageURL
		if (imageFile) {
			cloudinary.uploader.upload(
				imageFile.path,
				{ folder: 'NIKE-STORE/products' },
				async (error, result) => {
					if (error) {
						console.log(error);
						return res.status(500).json({
							message: 'Error uploading image to Cloudinary',
						});
					}
					const imageURL = result.secure_url;
					await product.update({
						productName,
						description,
						price,
					});
					// Update the corresponding ProductImage record in the database
					await ProductImage.update(
						{ imageURL },
						{ where: { productID, isFront: 1 } }
					);
					res.status(200).json({
						message: 'Product updated',
						product,
					});
				}
			);
		} else {
			// If no image file is uploaded, update other product details without changing the imageURL
			await product.update({
				productName,
				description,
				price,
			});

			res.status(200).json({ message: 'Product updated', product });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error updating product' });
	}
});

// DELETE

// Delete a Product record and its corresponding ProductImage and Inventory records
productRouter.delete('/:productID', async (req, res) => {
	try {
		const productID = req.params.productID;
		const product = await Product.findByPk(productID);

		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}

		await ProductImage.destroy({ where: { productID } });
		await Inventory.destroy({ where: { productID } });
		await product.destroy();

		res.status(200).json({ message: 'Product deleted' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error deleting product' });
	}
});

export default productRouter;
