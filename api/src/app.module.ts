import { Global, Module } from '@nestjs/common';
import { EnvConfig } from 'configuration/env.config';
import { PrismaService } from 'configuration/database/prisma.service';
import { UsersModule } from 'users/users.module';
import { BuildingsModule } from 'buildings/buildings.module';
import { ClaimsModule } from './claims/claims.module';
import { StaticConfig } from 'configuration/static.config';

@Global()
@Module({
  imports: [
    EnvConfig,
    StaticConfig,
    UsersModule,
    BuildingsModule,
    ClaimsModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
