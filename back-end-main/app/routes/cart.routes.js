import express from 'express';
import ShoppingCart from '../models/cart.models.js';
import User from '../models/user.models.js';
import Product from '../models/product.models.js';
import Inventory from '../models/inventory.model.js';

const cartRouter = express.Router();

// GET

// Obtaining cart items by userID and their corresponding products (base path /api/cart/user/:userID)
cartRouter.get('/user/:userID', async (req, res) => {
	try {
		const userID = req.params.userID;

		// Verify if the user exists
		const user = await User.findByPk(userID);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Obtaining the cart items
		const cartItems = await ShoppingCart.findAll({
			where: { userID },
		});

		// Obtaining the products of the cart items
		const cartItemsWithProducts = await Promise.all(
			cartItems.map(async (cartItem) => {
				const product = await Product.findByPk(cartItem.productID);
				if (product.length === 0) {
					return { ...cartItem.dataValues, product: {} };
				}
				return { ...cartItem.dataValues, product };
			})
		);

		if (cartItemsWithProducts.length === 0) {
			return res.status(404).json({ message: 'Cart items not found' });
		}

		res.status(200).json(cartItemsWithProducts);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error retrieving cart items' });
	}
});

// Obtaining a cart item by userID and where the product has cartStatus active (base path /api/cart/user/:userID/active)
cartRouter.get('/user/:userID/active', async (req, res) => {
	try {
		const userID = req.params.userID;

		// Verify if the user exists
		const user = await User.findByPk(userID);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Obtaining the all the user cart items with cartStatus active
		const cartItems = await ShoppingCart.findAll({
			where: { userID, cartStatus: 'active' },
		});

		if (!cartItems) {
			return res
				.status(404)
				.json({ message: 'User has no active items' });
		}

		// Obtaining the products of the cart items
		const cartItemsWithProducts = await Promise.all(
			cartItems.map(async (cartItem) => {
				const product = await Product.findByPk(cartItem.productID);
				if (product.length === 0) {
					return { ...cartItem.dataValues, product: {} };
				}
				return { ...cartItem.dataValues, product };
			})
		);

		if (cartItemsWithProducts.length === 0) {
			return res.status(404).json({ message: 'Cart items not found' });
		}

		res.status(200).json(cartItemsWithProducts);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error retrieving cart item' });
	}
});

// Obtaining a cart item by userID and where the product has cartStatus inactive (base path /api/cart/user/:userID/inactive)

// This one works for creating a history of purchases
cartRouter.get('/user/:userID/inactive', async (req, res) => {
	try {
		const userID = req.params.userID;

		// Verify if the user exists
		const user = await User.findByPk(userID);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Obtaining the cart item
		const cartItem = await ShoppingCart.findOne({
			where: { userID, cartStatus: 'inactive' },
		});

		if (!cartItem) {
			return res
				.status(404)
				.json({ message: 'User has no inactive items' });
		}

		// Obtaining the product of the cart item
		const product = await Product.findByPk(cartItem.productID);

		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}

		res.status(200).json({ ...cartItem.dataValues, product });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error retrieving cart item' });
	}
});

// Obtaining a cart item by userID and where the product has cartStatus cancelled (base path /api/cart/user/:userID/cancelled)
cartRouter.get('/user/:userID/cancelled', async (req, res) => {
	try {
		const userID = req.params.userID;

		// Verify if the user exists
		const user = await User.findByPk(userID);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Obtaining the cart item
		const cartItem = await ShoppingCart.findOne({
			where: { userID, cartStatus: 'cancelled' },
		});

		if (!cartItem) {
			return res
				.status(404)
				.json({ message: 'User has no cancelled inactive' });
		}

		// Obtaining the product of the cart item
		const product = await Product.findByPk(cartItem.productID);

		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}

		res.status(200).json({ ...cartItem.dataValues, product });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error retrieving cart item' });
	}
});

// POST

// Create a new cart item if the product is available in the inventory and the user exists and if the product is already in the cart, update the quantity (base path /api/cart/add)
cartRouter.post('/', async (req, res) => {
	try {
		const { userID, productID, quantity } = req.body;

		// Verify if the user exists
		const user = await User.findByPk(userID);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Verify if the product exists
		const product = await Product.findByPk(productID);

		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}

		// Verify if the product is available in the inventory (quantity > 0)
		const inventory = await Inventory.findOne({
			where: { productID },
		});

		if (!inventory) {
			return res.status(404).json({ message: 'Inventory not found' });
		}

		if (inventory.quantity === 0 || inventory.quantity < quantity) {
			return res
				.status(404)
				.json({ message: 'Not enough inventory for the product' });
		}

		// Verify if the product is already in the cart and has cartStatus active
		const cartItem = await ShoppingCart.findOne({
			where: { userID, productID , cartStatus: 'active' },
		});

		if (cartItem) {
			// Update the quantity of the product in the cart if the sum of the quantity is less than the inventory
			if (quantity + cartItem.quantity <= 1) {
				return res.status(404).json({
					message: 'You must add at least one product to the cart',
				});
			} else if (cartItem.quantity + quantity <= inventory.quantity) {
				await cartItem.update({
					quantity: cartItem.quantity + quantity,
				});
				return res.status(200).json({ message: 'Cart item updated' });
			} else {
				return res.status(404).json({
					message: 'Not enough inventory for the product',
				});
			}
		}

		// Verify if the quantity is less than 1
		if (quantity < 1) {
			return res.status(404).json({
				message: 'You must add at least one product to the cart',
			});
		}

		// if theres the same product by the same user cancelled, destroy the cancelled one
		const cartItemCancelled = await ShoppingCart.findOne({
			where: { userID, productID, cartStatus: 'cancelled' },
		});

		if (cartItemCancelled) {
			await cartItemCancelled.destroy();
		}

		// Create a new cart item
		await ShoppingCart.create({ userID, productID, quantity });

		res.status(200).json({ message: 'Product added to the cart' });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Error adding the product to the cart',
		});
	}
});

// PUT

// Cancel a cart item by its cartID (base path /api/cart/cancel/:cartID)
cartRouter.put('/:cartID/cancel', async (req, res) => {
	try {
		const cartID = req.params.cartID;

		// Verify if the cart item exists
		const cartItem = await ShoppingCart.findByPk(cartID);

		if (!cartItem) {
			return res.status(404).json({ message: 'Cart item not found' });
		}

		// Verify if the cart item has cartStatus active
		if (cartItem.cartStatus !== 'active') {
			return res.status(404).json({
				message: 'Cart item is not active, cannot be cancelled',
			});
		}

		// Cancel the cart item
		await cartItem.update({ cartStatus: 'cancelled' });

		res.status(200).json({ message: 'Cart item cancelled' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error cancelling the cart item' });
	}
});

// Activate a cart item by its cartID (base path /api/cart/activate/:cartID)
cartRouter.put('/:cartID/activate', async (req, res) => {
	try {
		const cartID = req.params.cartID;

		// Verify if the cart item exists
		const cartItem = await ShoppingCart.findByPk(cartID);

		if (!cartItem) {
			return res.status(404).json({ message: 'Cart item not found' });
		}

		// Verify if the cart item has cartStatus cancelled
		if (cartItem.cartStatus !== 'cancelled') {
			return res.status(404).json({
				message: 'Cart item is not cancelled, cannot be activated',
			});
		}

		// If the product is available in the inventory, activate the cart item
		const inventory = await Inventory.findOne({
			where: { productID: cartItem.productID },
		});

		if (inventory.quantity > 0) {
			await cartItem.update({ cartStatus: 'active' });
			return res.status(200).json({ message: 'Cart item activated' });
		}

		res.status(404).json({
			message: 'Cart item cannot be activated, not enough inventory',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error activating the cart item' });
	}
});

// DELETE

// Delete a product from the cart (base path /api/cart/:cartID)
cartRouter.delete('/:cartID', async (req, res) => {
	try {
		const cartID = req.params.cartID;

		// Verificar si el registro del carrito existe
		const cartItem = await ShoppingCart.findByPk(cartID);

		if (!cartItem) {
			return res
				.status(404)
				.json({ message: 'Registro del carrito no encontrado' });
		}

		// Eliminar el producto del carrito
		await cartItem.destroy();

		res.status(200).json({ message: 'Producto eliminado del carrito' });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Error al eliminar el producto del carrito',
		});
	}
});

export default cartRouter;
