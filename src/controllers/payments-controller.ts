import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';

export async function findPayment(req: AuthenticatedRequest, res: Response) {
  const ticketId = req.query.ticketId as string;

  try {
    const payment = await paymentsService.findUserPayment({
      ticketId: Number(ticketId),
      userId: req.userId,
    });

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === 'InvalidDataError') return res.sendStatus(httpStatus.BAD_REQUEST);
    if (error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function createPayment(req: AuthenticatedRequest, res: Response) {
  try {
    const payment = await paymentsService.createPayment({
      ...req.body,
      userId: req.userId,
    });

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED);
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
