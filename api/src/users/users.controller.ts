import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@tpoai/data-commons';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() data: Prisma.UserCreateInput) {
    return this.usersService.create(data);
  }
}
