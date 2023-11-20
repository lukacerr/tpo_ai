import { INestApplication } from '@nestjs/common';

export const CorsConfig = (app: INestApplication) => app.enableCors();
