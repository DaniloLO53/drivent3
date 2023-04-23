import { invalidDataError, notFoundError, unauthorizedError } from '@/errors';
import paymentRepository from '@/repositories/payment-repository';
import ticketRepository from '@/repositories/ticket-repository';

export type FindPaymentParams = {
  userId: number;
  ticketId: number;
};

export type PaymentBody = FindPaymentParams & {
  cardData: {
    issuer: string;
    number: number;
    name: string;
    expirationDate: Date;
    cvv: number;
  };
};

export type PaymentProps = {
  ticketId: number;
  value: number;
  cardIssuer: string;
  cardLastDigits: string;
};

async function findUserPayment({ ticketId, userId }: FindPaymentParams) {
  if (!ticketId) throw invalidDataError(['invalid ticket id']);

  const ticket = await ticketRepository.findTicketAndEnrollment(ticketId);
  if (!ticket) throw notFoundError();

  if (ticket.Enrollment.userId !== userId) throw unauthorizedError();

  const payment = await paymentRepository.findUserPayment(ticketId);

  if (!payment) throw notFoundError();

  return payment;
}

async function createPayment(params: PaymentBody) {
  const ticket = await ticketRepository.findTicketAndEnrollment(params.ticketId);
  if (!ticket) throw notFoundError();

  if (ticket.Enrollment.userId !== params.userId) throw unauthorizedError();

  const price = await ticketRepository.findTicketByEnrollmentId(ticket.enrollmentId);

  const paymentData: PaymentProps = {
    ticketId: params.ticketId,
    value: price.TicketType.price,
    cardIssuer: params.cardData.issuer,
    cardLastDigits: params.cardData.number.toString().slice(-4),
  };

  const createdPayment = await paymentRepository.createPayment(paymentData);

  await ticketRepository.updateTicketStatus(ticket.id);

  return createdPayment;
}

const paymentsService = {
  findUserPayment,
  createPayment,
};

export default paymentsService;
