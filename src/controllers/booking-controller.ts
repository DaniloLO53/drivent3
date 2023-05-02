import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';

export async function findBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  console.log('id', userId);
  try {
    const booking = await bookingService.findBooking(userId);

    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error.message);
  }
}

export async function createBooking(req: AuthenticatedRequest, res: Response) {
  const { roomId } = req.body;
  const { userId } = req;

  try {
    const { id } = await bookingService.createBooking({ userId, roomId });

    return res.status(httpStatus.OK).send({ bookingId: id });
  } catch (error) {
    if (error.name === 'NotFoundError') return res.status(httpStatus.NOT_FOUND).send(error.message);
    if (error.name === 'ForbiddenError') return res.status(httpStatus.FORBIDDEN).send(error.message);
  }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response) {
  const { bookingId } = req.params;
  const { roomId } = req.body;
  const { userId } = req;

  try {
    const { id } = await bookingService.updateBooking({ userId, bookingId: Number(bookingId), roomId });

    return res.status(httpStatus.OK).send({ bookingId: id });
  } catch (error) {
    if (error.name === 'NotFoundError') return res.status(httpStatus.NOT_FOUND).send(error.message);
    if (error.name === 'ForbiddenError') return res.status(httpStatus.FORBIDDEN).send(error.message);
  }
}
