import { Payment } from '@prisma/client';
import { prisma } from '@/config';
import { PaymentProps } from '@/services';

async function findPaymentAndEnrollment(ticketId: number) {
  return await prisma.payment.findFirst({
    where: { ticketId },
    include: { Ticket: { include: { Enrollment: true } } },
  });
}

async function createPayment(data: PaymentProps) {
  return await prisma.payment.create({
    data: data,
  });
}

async function findUserPayment(ticketId: number): Promise<Payment> {
  return await prisma.payment.findFirst({
    where: { ticketId },
  });
}

const paymentRepository = {
  findUserPayment,
  findPaymentAndEnrollment,
  createPayment,
};

export default paymentRepository;
