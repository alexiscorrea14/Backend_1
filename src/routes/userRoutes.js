import express from "express";
import UserRepository from "../dao/repositories/UserRepository.js"; 
import { authenticateUser, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();
const userRepo = new UserRepository();

router.get("/", authenticateUser, isAdmin, async (req, res) => {
  const users = await userRepo.getAll();
  res.json(users);
});

router.post("/", async (req, res) => {
  const newUser = await userRepo.create(req.body);
  res.status(201).json(newUser);
});

router.put("/:id", authenticateUser, async (req, res) => {
  const updatedUser = await userRepo.update(req.params.id, req.body);
  res.json(updatedUser);
});

router.delete("/:id", authenticateUser, isAdmin, async (req, res) => {
  await userRepo.delete(req.params.id);
  res.status(204).send();
});

export default router;
