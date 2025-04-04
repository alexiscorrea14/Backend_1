import productRepository from "../dao/repositories/productRepository.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await productRepository.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await productRepository.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al crear producto", error });
  }
};
