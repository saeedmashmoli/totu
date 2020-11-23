import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
// import * as helmet from 'helmet';
import * as compression from 'compression';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.enableCors();
  // app.use(helmet());
  app.use(compression());
  app.useStaticAssets(join(__dirname , 'public'))
  await app.listen(3000);
}
bootstrap();
