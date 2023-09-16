import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@tpoai/data-commons';
import { PrismaService } from 'configuration/database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }
}
