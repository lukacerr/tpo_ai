import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

interface IPrivateEndpointConfig {
  adminOnly: boolean;
}

export const Private = (cfg?: IPrivateEndpointConfig) =>
  applyDecorators(
    ApiBearerAuth(),
    SetMetadata('ADMIN_ONLY', cfg?.adminOnly),
    UseGuards(AuthGuard),
  );
