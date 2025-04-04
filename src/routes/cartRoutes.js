import express from "express";
import Cart from "../dao/models/cartModel.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateUser, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate("products.product");
  res.json(cart);
});

router.post("/", authenticateUser, async (req, res) => {
  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = new Cart({ user: req.user.id, products: [] });
  }

  const { productId, quantity } = req.body;
  const existingProduct = cart.products.find(item => item.product.toString() === productId);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.products.push({ product: productId, quantity });
  }

  await cart.save();
  res.status(201).json(cart);
});

router.delete("/:productId", authenticateUser, async (req, res) => {
  let cart = await Cart.findOne({ user: req.user.id });

  cart.products = cart.products.filter(item => item.product.toString() !== req.params.productId);
  await cart.save();

  res.status(204).send();
});

export default router;
