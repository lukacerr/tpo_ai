import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@tpoai/data-commons';
import { PrismaService } from 'configuration/database/prisma.service';
import { hash, genSalt } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUnique(query: Prisma.UserFindUniqueArgs): Promise<User | null> {
    return this.prisma.user.findUnique(query);
  }

  async register(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...data,
        password: await hash(data.password, await genSalt()),
      },
    });
  }
}
