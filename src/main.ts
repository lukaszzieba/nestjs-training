import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { Env } from './types';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<Env>);
  const port = configService.get('PORT');
  await app.listen(port);
}
bootstrap();
