import express from 'express';
import CartModel from '../models/CartModel.js';

const router = express.Router();

router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await CartModel.findById(cid);
    const productIndex = cart.products.findIndex(product => product.productId.toString() === pid);
    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      await cart.save();
      res.status(200).json({ status: 'success', message: 'Producto eliminado del carrito' });
    } else {
      res.status(404).json({ status: 'error', message: 'Producto no encontrado en el carrito' });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al eliminar el producto del carrito' });
  }
});

router.put('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;
    const updatedCart = await CartModel.findByIdAndUpdate(cid, { products }, { new: true });
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al actualizar el carrito' });
  }
});

router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cart = await CartModel.findById(cid);
    const product = cart.products.find(product => product.productId.toString() === pid);
    if (product) {
      product.quantity = quantity;
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ status: 'error', message: 'Producto no encontrado en el carrito' });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al actualizar la cantidad del producto' });
  }
});

router.delete('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    await CartModel.findByIdAndUpdate(cid, { products: [] });
    res.status(200).json({ status: 'success', message: 'Todos los productos han sido eliminados del carrito' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al eliminar productos del carrito' });
  }
});

export default router;
