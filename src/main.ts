import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port', 3000);
  const host = configService.get<string>('app.host', 'localhost');
  app.enableShutdownHooks();
  await app.listen(port, host, () => {
    console.info(`Application is running on ${host}:${port}`);
  });
}

void bootstrap();
