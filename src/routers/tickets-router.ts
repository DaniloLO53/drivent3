import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createTicketByUser, findTicketByUser, getTicketTypes } from '@/controllers/tickets-controller';
import { createTicketSchema } from '@/schemas';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getTicketTypes)
  .get('/', findTicketByUser)
  .post('/', validateBody(createTicketSchema), createTicketByUser);

export { ticketsRouter };
