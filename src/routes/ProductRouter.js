import express from 'express';
import ProductModel from '../models/ProductModel.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
});

export default router;
