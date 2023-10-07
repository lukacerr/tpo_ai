import { JwtModule } from '@nestjs/jwt';

export const JwtConfig = JwtModule.register({
  secret: process.env.API_JWT_SECRET,
});
