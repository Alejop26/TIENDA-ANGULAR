import express from 'express';
import Inventory from '../models/inventory.model.js';
import Product from '../models/product.models.js';

const inventoryRouter = express.Router();

// GET

// Obtaining all inventories and their corresponding products (base path /api/inventory)
inventoryRouter.get('/', async (req, res) => {
	try {
		const inventories = await Inventory.findAll();

		const inventoriesWithProducts = await Promise.all(
			inventories.map(async (inventory) => {
				const product = await Product.findByPk(inventory.productID);
				if (product.length === 0) {
					return { ...inventory.dataValues, product: {} };
				}
				return { ...inventory.dataValues, product };
			})
		);
		if (inventoriesWithProducts.length === 0) {
			return res.status(404).json({ message: 'Inventories not found' });
		}
		res.status(200).json(inventoriesWithProducts);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error retrieving inventories' });
	}
});

// Obtaining an inventory by its productID with its corresponding product (base path /api/inventory/product/:productID)
inventoryRouter.get('/product/:productID', async (req, res) => {
	try {
		const productID = req.params.productID;
		const inventory = await Inventory.findOne({
			where: { productID },
		});
		const product = await Product.findByPk(productID);
		if (!inventory) {
			return res.status(404).json({ message: 'Inventory not found' });
		}
		res.status(200).json({ ...inventory.dataValues, product });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error retrieving inventory' });
	}
});

// PUT

// Update an inventory by its productID (base path /api/inventory/product/:productID)
inventoryRouter.put('/product/:productID', async (req, res) => {
	try {
		const productID = req.params.productID;
		const { quantity, stockMin, stockMax } = req.body;

		// Verify if the product exists
		const product = await Product.findByPk(productID);

		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}

		// Verify if the inventory exists
		let inventory = await Inventory.findOne({
			where: { productID },
		});

		// If the inventory does not exist, create it
		if (!inventory) {
			inventory = await Inventory.create({
				productID,
				quantity,
				stockMin,
				stockMax,
			});
		} else {
			// If the inventory exists, update it
			await inventory.update({
				quantity,
				stockMin,
				stockMax,
			});
		}

		res.status(200).json({ message: 'Inventory updated successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Error updating inventory',
		});
	}
});

export default inventoryRouter;
