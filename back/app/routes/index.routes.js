import express from 'express';
import userRoutes from './user.routes.js';
import cartRouter from './cart.routes.js';
import productRouter from './products.routes.js';
import inventoryRouter from './inventory.routes.js';
import ordersRouters from './orders.routes.js';
import paymentRouter from './payment.routes.js';
import productImageRouter from './productImages.routes.js';
import pingController from '../controllers/pingController.js';
import loginRouter from './login.routes.js';

const router = express.Router();

// Ruta principal (base path /api)
router.get('/', (req, res) => {
	res.status(200).json({
		message: 'Welcome to the API',
		users: {
			allUsers: 'GET /api/users', // Admin only
			userByID: 'GET /api/users/:id',
			userByUsername: 'GET /api/users/username/:username',
			createUser: 'POST /api/users',
			updateUser: 'PUT /api/users/:id',
			deleteUser: 'DELETE /api/users/:id',
		},
		products: {
			allProducts: 'GET /api/products',
			productByID: 'GET /api/products/:productID',
			createProduct: 'POST /api/products',
			updateProduct: 'PUT /api/products/:productID',
			deleteProduct: 'DELETE /api/products/:productID',
		},
		images: {
			allImages: 'GET /api/images',
			imageByID: 'GET /api/images/:imageID',
			createImage: 'POST /api/images',
			deleteImage: 'DELETE /api/images/:imageID',
		},
		inventory: {
			allInventory: 'GET /api/inventory',
			inventoryByProductID: 'GET /api/inventory/product/:productID',
			updateInventory: 'PUT /api/inventory/product/:productID',
		},
		cart: {
			cartItemsByUserID: 'GET /api/cart/user/:userID',
			cartItemsByUserIDActive: 'GET /api/cart/user/:userID/active',
			cartItemsByUserIDInactive: 'GET /api/cart/user/:userID/inactive',
			cartItemsByUserIDCancelled: 'GET /api/cart/user/:userID/cancelled',
			createCartItem: 'POST /api/cart', // Send quantity negative or positive to add or remove items from the cart
			cancelCartItem: 'PUT /api/cart/:cartID/cancel',
			deleteCartItem: 'DELETE /api/cart/:cartID',
		},
		orders: {
			allOrders: 'GET /api/orders', // Admin only
			ordersByUserID: 'GET /api/orders/user/:userID',
			createOrder: 'POST /api/orders',
		},
		payment: {
			paymentLinkSuccess: 'POST /api/payment/success',
			paymentLinkCancel: 'POST /api/payment/cancel',
		},
		login: {
			login: 'POST /api/login',
		}
	});
});

// Rutas para los usuarios (base path: /api/users)
router.use('/users', userRoutes);

// Rutas para los productos (base path: /api/products)
router.use('/products', productRouter);

// Rutas para las imagenes de los productos (base path: /api/productImages)
router.use('/images', productImageRouter);

// Rutas para el inventario (base path: /api/inventory)
router.use('/inventory', inventoryRouter);

// Rutas para los pedidos (base path: /api/orders)
router.use('/orders', ordersRouters);

// Rutas para el carrito (base path: /api/cart)
router.use('/cart', cartRouter);

// Rutas para el pago (base path: /api/payment)
router.use('/payment', paymentRouter);

// Ping
router.get('/ping', pingController);

//Login
router.post('/login', loginRouter);

export default router;
