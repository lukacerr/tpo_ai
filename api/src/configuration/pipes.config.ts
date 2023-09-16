import { INestApplication, ValidationPipe } from '@nestjs/common';

export const PipesConfig = (app: INestApplication) =>
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
