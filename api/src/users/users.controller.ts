import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@tpoai/data-commons';
import { AuthService } from './auth/auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Inicio de sesión' })
  @Post('login')
  login(@Body() data: Prisma.UserUncheckedCreateInput) {
    return this.authService.logIn(data.username, data.password);
  }

  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @Post('register')
  register(@Body() data: Prisma.UserCreateInput) {
    return this.usersService.register(data);
  }
}
