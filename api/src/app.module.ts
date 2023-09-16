import { Global, Module } from '@nestjs/common';
import { EnvConfig } from 'configuration/env.config';
import { PrismaService } from 'configuration/database/prisma.service';
import { UsersModule } from 'users/users.module';

@Global()
@Module({
  imports: [EnvConfig, UsersModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
