import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getAllHotels, getHotelsWithRooms } from '@/controllers';

const hotelsRouter = Router();

hotelsRouter.all('/*', authenticateToken).get('/', getAllHotels).get('/:hotelId', getHotelsWithRooms);

export { hotelsRouter };
