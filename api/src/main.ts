import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from './configuration/swagger.config';
import { CorsConfig } from 'configuration/cors.config';

(async () => {
  const app = await NestFactory.create(AppModule);
  SwaggerConfig(app);
  CorsConfig(app);
  await app.listen(process.env.API_PORT ?? 5000);
})();
