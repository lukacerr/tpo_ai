import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@tpoai/data-commons';
import { PrismaService } from 'configuration/database/prisma.service';

@Injectable()
export class BuildingsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.BuildingCreateInput) {
    return this.prisma.building.create({ data });
  }

  findMany(user: User) {
    return this.prisma.building.findMany({
      where: user.isAdmin ? {} : { units: { some: { userId: user.id } } },
      include: { units: { where: { userId: user.id } }, amenities: true },
    });
  }

  findOne(id: number) {
    return this.prisma.building.findUnique({
      where: { id },
      include: { units: { include: { User: true } }, amenities: true },
    });
  }

  update(id: number, data: Prisma.BuildingUpdateInput) {
    return this.prisma.building.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.building.delete({ where: { id } });
  }
}
