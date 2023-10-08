import { ServeStaticModule } from '@nestjs/serve-static';

export const StaticConfig = ServeStaticModule.forRoot({
  rootPath: './public',
  serveRoot: '/public',
});
