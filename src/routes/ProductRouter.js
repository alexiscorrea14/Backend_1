import { Router } from 'express';
import { ProductManager } from '../managers/ProductManager.js';

const router = Router();

router.get('/', async (req, res) => {
  const products = await ProductManager.getProducts();
  res.json(products);
});

router.get('/:pid', async (req, res) => {
  const { pid } = req.params;
  const product = await ProductManager.getProductById(pid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

router.post('/', async (req, res) => {
  const product = req.body;
  const newProduct = await ProductManager.addProduct(product);
  res.status(201).json(newProduct);
});

router.put('/:pid', async (req, res) => {
  const { pid } = req.params;
  const updatedProduct = req.body;
  const product = await ProductManager.updateProduct(pid, updatedProduct);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

router.delete('/:pid', async (req, res) => {
  const { pid } = req.params;
  const product = await ProductManager.deleteProduct(pid);
  if (product) {
    res.json({ message: 'Producto eliminado' });
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

export default router;
