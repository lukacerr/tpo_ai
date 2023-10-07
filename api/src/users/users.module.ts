import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtConfig } from 'configuration/jwt.config';
import { AuthService } from './auth/auth.service';

@Global()
@Module({
  imports: [JwtConfig],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  exports: [JwtConfig],
})
export class UsersModule {}
