import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createHotel() {
  return prisma.hotel.create({
    data: {
      image: faker.image.imageUrl(),
      name: faker.name.findName(),
    },
  });
}

export async function createRoom(hotelId: number) {
  await prisma.room.create({
    data: {
      name: faker.name.findName(),
      capacity: faker.datatype.number({ min: 1, max: 6, precision: 1 }),
      hotelId,
    },
  });

  return prisma.hotel.findUnique({
    where: { id: hotelId },
    include: { Rooms: true },
  });
}
