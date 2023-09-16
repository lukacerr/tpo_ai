import { ConfigModule } from '@nestjs/config';

export const EnvConfig = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '../.env',
  expandVariables: true,
});
