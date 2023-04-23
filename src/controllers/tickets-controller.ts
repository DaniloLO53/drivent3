import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketTypes = await ticketsService.getTicketTypes();

    return res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function createTicketByUser(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body;

  try {
    const ticket = await ticketsService.createTicket({
      userId: req.userId,
      status: 'RESERVED',
      ticketTypeId,
    });
    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function findTicketByUser(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  try {
    const userTicket = await ticketsService.findUserTicket(userId);
    return res.status(httpStatus.OK).send(userTicket);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}
