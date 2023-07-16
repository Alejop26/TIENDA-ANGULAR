import express from 'express';
import Order from '../models/orders.model.js';
import ShoppingCart from '../models/cart.models.js';
import Product from '../models/product.models.js';
import { openStripePaymentLink } from '../controllers/processPayment.js';
import User from '../models/user.models.js';

const orderRouter = express.Router();

// GET

// Obtaining all orders (base path /api/orders)
orderRouter.get('/', async (req, res) => {
	try {
		const orders = await Order.findAll();

		if (orders.length === 0) {
			return res.status(404).json({ message: 'Orders not found' });
		}

		// Obtaining the products of the order by cartID when finded the cart search the product within the cart
		const ordersWithProducts = await Promise.all(
			orders.map(async (order) => {
				const cartID = order.cartID;
				const orderWithCart = await ShoppingCart.findAll({
					where: { cartID },
				});

				const orderWithProducts = await Promise.all(
					orderWithCart.map(async (cartItem) => {
						const product = await Product.findByPk(
							cartItem.productID
						);
						if (product.length === 0) {
							return { ...cartItem.dataValues, product: {} };
						}
						return { ...cartItem.dataValues, product };
					})
				);
				return { ...order.dataValues, orderWithProducts };
			})
		);

		if (!ordersWithProducts) {
			return res.status(404).json({ message: 'Product not found' });
		}

		res.status(200).json(ordersWithProducts);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error retrieving orders' });
	}
});

// Obtaining an order by userID with their corresponding products (base path /api/orders/user/:userID)
orderRouter.get('/cart/:cartID', async (req, res) => {
	try { 
		const cartID = req.params.cartID;

		// Verify if the user exists
		const cart = await ShoppingCart.findByPk(cartID);

		if (!cart) {
			return res.status(404).json({ message: 'Cart not found' });
		}

		// Obtaining the order
		const order = await Order.findOne({
			where: { cartID },
		});

		if (!order) {
			return res.status(404).json({ message: 'Order not found' });
		}
		console.log(order);
		// Obtaining the products of the order by cartID when finded the cart search the product within the cart
		const orderWithCart = await ShoppingCart.findAll({
			where: { cartID },
		});

		const orderWithProducts = await Promise.all(
			orderWithCart.map(async (cartItem) => {
				const product = await Product.findByPk(cartItem.productID);
				if (product.length === 0) {
					return { ...cartItem.dataValues, product: {} };
				}
				return { ...cartItem.dataValues, product };
			})
		);

		if (!orderWithProducts) {
			return res.status(404).json({ message: 'Product not found' });
		}

		res.status(200).json({ ...order.dataValues, orderWithProducts });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error retrieving order' });
	}
});

// POST

// Creating an order (base path /api/orders)
orderRouter.post('/', async (req, res) => {
	const { cartID, shippingAddress } = req.body;

	try {
		// Verify if the user exists
		const user = await User.findByPk(cartID);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Obtaining the active carts of the user
		const activeCarts = await ShoppingCart.findAll({
			where: {
				cartID: cartID,
				cartStatus: 'active',
			},
		});

		if (activeCarts.length === 0) {
			return res.status(404).json({ message: 'Empty cart' });
		}

		let totalPrice = 0;

		// Obtaining the total price of the order
		for (const cart of activeCarts) {
			const product = await Product.findByPk(cart.productID);

			if (!product) {
				return res.status(404).json({ message: 'Product not found' });
			}

			totalPrice += product.price * cart.quantity;
		}

		// Creating the order with stripe
		const paymentLinkResponse = await openStripePaymentLink(
			activeCarts,
			totalPrice,
			cartID,
			shippingAddress
		);

		if (
			paymentLinkResponse.url !== undefined &&
			paymentLinkResponse.success
		) {
			// Creating the order in the database
			return res.status(200).json({
				message: 'Payment link created',
				url: paymentLinkResponse.url,
			});
		}
		if (!paymentLinkResponse.success) {
			// Error creating the payment link
			return res.status(400).json({
				message: 'Error creating the payment link',
				error: paymentLinkResponse.error,
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error creating the order' });
	}
});

export default orderRouter;
