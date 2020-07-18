import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (process.env.ALLOWED_ORIGINS) {
    app.enableCors({ origin: process.env.ALLOWED_ORIGINS.split(',') });
  }
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Listening on port ${port}`)
}
bootstrap();
