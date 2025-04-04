import express from "express";
import Ticket from "../dao/models/ticketModel.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import generateCode from "../utils/generateTicketCode.js"; 

const router = express.Router();

router.post("/", authenticateUser, async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "El monto es obligatorio." });
    }

    const newTicket = new Ticket({
      code: generateCode(), 
      amount,
      purchaser: req.user.email,
    });

    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el ticket." });
  }
});

router.get("/", authenticateUser, async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los tickets." });
  }
});

export default router;
