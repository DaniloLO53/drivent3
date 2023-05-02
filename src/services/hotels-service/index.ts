import { Enrollment, Hotel } from '@prisma/client';
import { hotelsError, notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/ticket-repository';
import hotelsRepository from '@/repositories/hotel-repository';

async function verify(userId: number) {
  const enrollment: Enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  let ticket;
  enrollment && (ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id));

  if (!enrollment || !enrollment) throw notFoundError();

  if (ticket.status !== 'PAID' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw hotelsError();
  }
}

async function getAllHotels(userId: number) {
  await verify(userId);

  const hotels: Hotel[] = await hotelsRepository.getAllHotels();
  if (hotels.length === 0) throw notFoundError();

  return hotels;
}

async function getHotelsWithRooms(userId: number, hotelId: number) {
  await verify(userId);

  const hotels = await hotelsRepository.getHotelById(hotelId);
  if (!hotels) throw notFoundError();

  return hotels;
}

export default { getAllHotels, getHotelsWithRooms };
