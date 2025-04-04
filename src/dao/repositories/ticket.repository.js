import TicketDAO from '../daoManagers/ticket.dao.js';

class TicketRepository {
  async create(ticketData) {
    return await TicketDAO.createTicket(ticketData);
  }

  async getById(id) {
    return await TicketDAO.getTicketById(id);
  }
}

export default new TicketRepository();
