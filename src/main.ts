import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ========================================
  // Validation
  // ========================================
  app.useGlobalPipes(
    new ValidationPipe({
      // Discart properties that are not defined in the DTO
      whitelist: true,
      // Forbid properties that are not defined in the DTO
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  await app.listen(3000);
}
bootstrap();
