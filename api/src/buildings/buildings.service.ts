import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@tpoai/data-commons';
import { PrismaService } from 'configuration/database/prisma.service';
import { UnitHasUser } from 'utils/decorators/user-on-units.operators';

@Injectable()
export class BuildingsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.BuildingCreateInput) {
    return this.prisma.building.create({ data });
  }

  findMany(user: User) {
    const unitIncludeUsers = { users: { include: { User: true } } };

    return this.prisma.building.findMany({
      where: user.isAdmin ? {} : { units: { some: UnitHasUser(user.id) } },
      include: {
        units: user.isAdmin
          ? { include: unitIncludeUsers }
          : { where: UnitHasUser(user.id), include: unitIncludeUsers },
        amenities: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.building.findUnique({
      where: { id },
      include: {
        units: { include: { users: { include: { User: true } } } },
        amenities: true,
      },
    });
  }

  update(id: number, data: Prisma.BuildingUpdateInput) {
    return this.prisma.building.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.building.delete({ where: { id } });
  }
}
