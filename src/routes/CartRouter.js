import express from 'express';
import CartModel from '../models/CartModel.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const cart = await CartModel.find();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el carrito' });
  }
});

export default router;
