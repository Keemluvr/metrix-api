import { ConfigService } from '@nestjs/config';

export default async (app) => {
  const configService = app.get(ConfigService);

  const allowedOrigins = [
    'http://localhost',
    `http://localhost:${configService.get('PORT')}`,
    configService.get('CORS_ALLOWED_ORIGIN'),
  ];

  app.enableCors({
    credentials: true,
    origin: (origin: string, callback) => {
      const originIsWhitelisted = allowedOrigins.includes(origin);
      const originStartsOrEndsWithAllowed = allowedOrigins.some(
        (or) => origin.endsWith(or) || origin.startsWith(or),
      );

      if (!origin || !originIsWhitelisted || !originStartsOrEndsWithAllowed) {
        callback(new Error('Origin not allowed by CORS'));
      }

      callback(null, true);
    },
  });
};
