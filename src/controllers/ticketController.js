import ticketRepository from "../dao/repositories/ticketRepository.js";

export const createTicket = async (req, res) => {
  try {
    const ticket = await ticketRepository.create(req.body);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Error al generar ticket", error });
  }
};
