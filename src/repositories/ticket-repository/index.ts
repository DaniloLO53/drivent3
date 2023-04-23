import { TicketStatus } from '@prisma/client';
import { prisma } from '@/config';

async function findAllTicketTypes() {
  return prisma.ticketType.findMany();
}

async function findTicketByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId: enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

async function create(ticketTypeId: number, enrollmentId: number, status: TicketStatus) {
  return await prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status,
    },
    include: {
      TicketType: true,
    },
  });
}

async function findTicketAndEnrollment(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
    },
  });
}

async function updateTicketStatus(id: number) {
  return prisma.ticket.update({
    where: { id },
    data: {
      status: 'PAID',
    },
  });
}

const ticketRepository = {
  findAllTicketTypes,
  create,
  findTicketByEnrollmentId,
  findTicketAndEnrollment,
  updateTicketStatus,
};

export default ticketRepository;
