const express = require('express');
const ProductModel = require('../models/ProductModel');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort = 'asc', query = '' } = req.query;

    const filters = query ? { category: query } : {};
    const sortOrder = sort === 'asc' ? 1 : -1;

    const products = await ProductModel.find(filters)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ price: sortOrder });

    const totalProducts = await ProductModel.countDocuments(filters);
    const totalPages = Math.ceil(totalProducts / limit);
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;
    const prevPage = hasPrevPage ? page - 1 : null;
    const nextPage = hasNextPage ? page + 1 : null;

    res.json({
      status: 'success',
      payload: products,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink: hasPrevPage ? `/api/products?page=${prevPage}&limit=${limit}&sort=${sort}&query=${query}` : null,
      nextLink: hasNextPage ? `/api/products?page=${nextPage}&limit=${limit}&sort=${sort}&query=${query}` : null
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al obtener los productos' });
  }
});

module.exports = router;
