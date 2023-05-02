import { Router } from 'express';
import { createBooking, findBooking, updateBooking } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/', findBooking)
  .post('/', createBooking)
  .put('/:bookingId', updateBooking);

export { bookingRouter };
