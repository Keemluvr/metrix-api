import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { initSequelizeCLS } from 'sequelize-transactional-decorator';

initSequelizeCLS();

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
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );

  // app.enableCors({
  //   origin: ['http://localhost:3000'],
  //   credentials: true,
  // });

  await app.listen(8080);
}
bootstrap();
