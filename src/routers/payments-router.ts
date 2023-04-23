import { Router } from 'express';
import { createPayment, findPayment } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { createPaymentSchema } from '@/schemas/payments-schemas';

const paymentsRouter = Router();

paymentsRouter
  .all('/*', authenticateToken)
  .get('/', findPayment)
  .post('/process', validateBody(createPaymentSchema), createPayment);

export { paymentsRouter };
