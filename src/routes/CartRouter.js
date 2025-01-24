import { Router } from 'express';
import { CartManager } from '../managers/CartManager.js';

const router = Router();

// Rutas para el carrito
router.get('/', async (req, res) => {
  const carts = await CartManager.getCarts();
  res.json(carts);
});

router.post('/', async (req, res) => {
  const cart = req.body;
  const newCart = await CartManager.addCart(cart);
  res.status(201).json(newCart);
});

router.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  const cart = await CartManager.getCartById(cid);
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ message: 'Carrito no encontrado' });
  }
});

router.post('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const product = await CartManager.addProductToCart(cid, pid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado en el carrito' });
  }
});

export default router;
