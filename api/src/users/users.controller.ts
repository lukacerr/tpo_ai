import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma, User } from '@tpoai/data-commons';
import { AuthService } from './auth/auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Private } from './auth/private.decorator';
import { ReqUser } from './auth/req-user.decorator';

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

  @ApiOperation({ summary: 'Obtener información del usuario actual' })
  @Private()
  @Get()
  find(@ReqUser() user: User) {
    return user;
  }

  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  // @Private({ adminOnly: true })
  @Post('register')
  register(@Body() data: Prisma.UserCreateInput) {
    return this.usersService.register(data);
  }
}
