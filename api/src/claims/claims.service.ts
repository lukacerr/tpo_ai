import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma, User } from '@tpoai/data-commons';
import { PrismaService } from 'configuration/database/prisma.service';
import { UnitHasUser } from 'utils/decorators/user-on-units.operators';

@Injectable()
export class ClaimsService {
  constructor(private prisma: PrismaService) {}

  private userOrClauseOwnership(userId: number) {
    return [
      { unit: UnitHasUser(userId) },
      {
        amenity: {
          Building: { units: { some: UnitHasUser(userId) } },
        },
      },
    ];
  }

  private async validateUserOwnership(
    data: Omit<Prisma.ClaimUncheckedCreateInput, 'claimStatus' | 'description'>,
  ) {
    const orClauses = this.userOrClauseOwnership(Number(data.userId));

    if (Number(data.unitId))
      await this.prisma.unit.findFirstOrThrow({
        where: { id: Number(data.unitId), ...UnitHasUser(Number(data.userId)) },
      });
    else if (Number(data.amenityId))
      await this.prisma.amenity.findFirstOrThrow({
        where: {
          id: Number(data.amenityId),
          ...orClauses[1].amenity,
        },
      });
    else throw new UnauthorizedException();
  }

  async create(data: Prisma.ClaimUncheckedCreateInput) {
    await this.validateUserOwnership(data);
    return this.prisma.claim.create({
      data: {
        ...data,
        userId: Number(data.userId),
        unitId: Number(data.unitId),
        amenityId: Number(data.amenityId),
      },
    });
  }

  findAll() {
    return this.prisma.claim.findMany({
      include: {
        user: true,
        unit: {
          include: {
            Building: true,
          },
        },
        amenity: {
          include: {
            Building: true,
          },
        },
      },
    });
  }

  findOne(id: number, user: User) {
    return this.prisma.claim.findUniqueOrThrow({
      where: {
        id,
        OR: user.isAdmin ? [] : this.userOrClauseOwnership(user.id),
      },
      include: {
        user: true,
        unit: {
          include: {
            Building: true,
          },
        },
        amenity: {
          include: {
            Building: true,
          },
        },
      },
    });
  }

  findMany(user: User, query: Prisma.ClaimWhereInput) {
    return this.prisma.claim.findMany({
      where: { ...query, OR: this.userOrClauseOwnership(user.id) },
      include: {
        user: true,
        unit: {
          include: {
            Building: true,
          },
        },
        amenity: {
          include: {
            Building: true,
          },
        },
      },
    });
  }

  update(id: number, data: Prisma.ClaimUpdateInput) {
    return this.prisma.claim.update({ where: { id }, data });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delete(id: number, _: User) {
    return this.prisma.claim.delete({
      where: {
        id: Number(id),
        // OR: user.isAdmin ? [] : this.userOrClauseOwnership(user.id),
      },
    });
  }
}
