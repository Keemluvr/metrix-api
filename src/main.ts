import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { initSequelizeCLS } from 'sequelize-transactional-decorator';
import { ConfigService } from './config/config.service';
import { Logger as PinoLogger } from 'nestjs-pino';

initSequelizeCLS();

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useLogger(app.get(PinoLogger));

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

  await app.listen(configService.server.port);

  logger.log(`==========================================================`);
  logger.log(`Http Server running on ${await app.getUrl()}`, 'Application');
  logger.log(`==========================================================`);
  logger.log(
    `Documentation: ${await app.getUrl()}/documentation`,
    'Application',
  );
  logger.log(`==========================================================`);
}
bootstrap();
