import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env['APP_HOST'] ?? '0.0.0.0');
}

void bootstrap().then(() => {
  console.log(
    `Application is running on ${process.env['APP_HOST'] ?? '0.0.0.0'}:${process.env['APP_PORT'] ?? 3000}`,
  );
});
