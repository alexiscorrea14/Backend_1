import express from "express";
import productRepo from "../dao/repositories/productRepository.js"; 
import { authenticateUser, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await productRepo.getAll();
  res.json(products);
});

router.post("/", authenticateUser, isAdmin, async (req, res) => {
  const newProduct = await productRepo.create(req.body);
  res.status(201).json(newProduct);
});

router.put("/:id", authenticateUser, isAdmin, async (req, res) => {
  const updatedProduct = await productRepo.update(req.params.id, req.body);
  res.json(updatedProduct);
});

router.delete("/:id", authenticateUser, isAdmin, async (req, res) => {
  await productRepo.delete(req.params.id);
  res.status(204).send();
});

export default router;
