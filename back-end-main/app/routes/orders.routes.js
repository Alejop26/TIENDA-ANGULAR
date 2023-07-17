import express from "express";
import Order from "../models/orders.model.js";
import ShoppingCart from "../models/cart.models.js";
import Product from "../models/product.models.js";
import { openStripePaymentLink } from "../controllers/processPayment.js";
import User from "../models/user.models.js";

const orderRouter = express.Router();

// GET

// Obtaining all orders (base path /api/orders)
orderRouter.get("/", async (req, res) => {
  try {
    const orders = await Order.findAll();

    if (orders.length === 0) {
      return res.status(404).json({ message: "Orders not found" });
    }

    // Obtaining the products of the order by userID when finded the cart search the product within the cart
    const ordersWithProducts = await Promise.all(
      orders.map(async (order) => {
        const userID = order.userID;
        const orderWithCart = await ShoppingCart.findAll({
          where: { userID },
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
        return { ...order.dataValues, orderWithProducts };
      })
    );

    if (!ordersWithProducts) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(ordersWithProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving orders" });
  }
});

// Obtaining an order by userID with their corresponding products (base path /api/orders/user/:userID)
orderRouter.get("/user/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;

    // Verify if the user exists
    const user = await User.findByPk(userID);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Obtaining the order
    const order = await Order.findOne({
      where: { userID },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Obtaining the products of the order by cartID when finded the cart search the product within the cart
    const orderWithCart = await ShoppingCart.findAll({
      where: { userID },
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
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ ...order.dataValues, orderWithProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving order" });
  }
});

// POST

// Creating an order (base path /api/orders)
orderRouter.post("/", async (req, res) => {
  const { userID, shippingAddress } = req.body;

  try {
    // Verify if the user exists
    const user = await User.findByPk(userID);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Obtaining the active carts of the user
    const activeCarts = await ShoppingCart.findAll({
      where: {
        userID: userID,
        cartStatus: "active",
      },
    });

    if (activeCarts.length === 0) {
      return res.status(404).json({ message: "User has no items in his cart" });
    }

    let totalPrice = 0;

    // Obtaining the total price of the order
    for (const cart of activeCarts) {
      const product = await Product.findByPk(cart.productID);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      totalPrice += product.price * cart.quantity;
    }

    // Creating the order with stripe
    const paymentLinkResponse = await openStripePaymentLink(
      activeCarts,
      totalPrice,
      userID,
      shippingAddress
    );

    if (paymentLinkResponse.url !== undefined && paymentLinkResponse.success) {
      // Creating the order in the database
      return res.status(200).json({
        message: "Payment link created",
        url: paymentLinkResponse.url,
      });
    }
    if (!paymentLinkResponse.success) {
      // Error creating the payment link
      return res.status(400).json({
        message: "Error creating the payment link",
        error: paymentLinkResponse.error,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating the order" });
  }
});

// DELETE

// Deleting an order (base path /api/orders/:orderID)
orderRouter.delete("/:orderID", async (req, res) => {
  const orderID = req.params.orderID;

  try {
    // Verify if the order exists
    const order = await Order.findByPk(orderID);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Deleting the order
    await Order.destroy({
      where: { orderID },
    });

    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting the order" });
  }
});

export default orderRouter;
