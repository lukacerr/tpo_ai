import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma, User } from '@tpoai/data-commons';
import { PrismaService } from 'configuration/database/prisma.service';

@Injectable()
export class ClaimsService {
  constructor(private prisma: PrismaService) {}

  private userOrClauseOwnership(userId: number) {
    return [
      { unit: { userId } },
      { amenity: { Building: { units: { some: { userId } } } } },
    ];
  }

  private validateUserOwnership(
    data: Omit<Prisma.ClaimUncheckedCreateInput, 'claimStatus' | 'description'>,
  ) {
    const orClauses = this.userOrClauseOwnership(data.userId);

    if (data.unitId)
      this.prisma.unit.findFirstOrThrow({
        where: { id: data.unitId, ...orClauses[0] },
      });
    else if (data.amenityId)
      this.prisma.amenity.findFirstOrThrow({
        where: {
          id: data.amenityId,
          ...orClauses[1].amenity,
        },
      });
    else throw new UnauthorizedException();
  }

  create(data: Prisma.ClaimUncheckedCreateInput) {
    this.validateUserOwnership(data);
    return this.prisma.claim.create({ data });
  }

  findAll() {
    return this.prisma.claim.findMany();
  }

  findOne(id: number, user: User) {
    return this.prisma.claim.findUniqueOrThrow({
      where: {
        id,
        OR: user.isAdmin ? [] : this.userOrClauseOwnership(user.id),
      },
    });
  }

  findMany(user: User, query: Prisma.ClaimWhereInput) {
    return this.prisma.claim.findMany({
      where: { ...query, OR: this.userOrClauseOwnership(user.id) },
    });
  }

  update(id: number, data: Prisma.ClaimUpdateInput) {
    return this.prisma.claim.update({ where: { id }, data });
  }

  delete(id: number, user: User) {
    return this.prisma.claim.delete({
      where: {
        id,
        OR: user.isAdmin ? [] : this.userOrClauseOwnership(user.id),
      },
    });
  }
}
