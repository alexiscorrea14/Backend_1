import express from 'express';
import ProductModel from '../models/ProductModel.js';
import CartModel from '../models/CartModel.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.render('index', { products });
  } catch (error) {
    res.status(500).json({ message: 'Error al cargar la página principal' });
  }
});

router.get('/cart', async (req, res) => {
  try {
    const cart = await CartModel.findOne(); 
    res.render('cart', { cart });
  } catch (error) {
    res.status(500).json({ message: 'Error al cargar el carrito' });
  }
});

router.get('/realTimeProducts', async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.render('realTimeProducts', { products });
  } catch (error) {
    res.status(500).json({ message: 'Error al cargar productos en tiempo real' });
  }
});

export default router;
