import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { initSequelizeCLS } from 'sequelize-transactional-decorator';
import { ConfigService } from '@nestjs/config';
import setupCors from './core/config/cors';

initSequelizeCLS();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

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
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );

  setupCors(app);

  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
