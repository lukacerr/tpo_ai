import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from './configuration/swagger.config';

(async () => {
  const app = await NestFactory.create(AppModule);
  SwaggerConfig(app);
  await app.listen(process.env.API_PORT ?? 5000);
})();
