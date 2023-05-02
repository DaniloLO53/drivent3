import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelService from '@/services/hotels-service/index';

export async function getAllHotels(req: AuthenticatedRequest, res: Response) {
  const userId: number = req.userId;

  try {
    const hotels = await hotelService.getAllHotels(userId);
    console.log('hotels', hotels);

    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'CannotFindHotelsError') {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getHotelsWithRooms(req: AuthenticatedRequest, res: Response) {
  const userId: number = req.userId;
  const hotelId = req.params.hotelId;

  try {
    const hotelRooms = await hotelService.getHotelsWithRooms(userId, Number(hotelId));

    return res.status(httpStatus.OK).send(hotelRooms);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'CannotFindHotelsError') {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
