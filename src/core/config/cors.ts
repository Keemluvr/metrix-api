import { ConfigService } from '@nestjs/config';

export default async (app) => {
  const configService = app.get(ConfigService);

  const allowedOrigins = [
    'http://localhost',
    `http://localhost:${configService.get('PORT')}`,
    'http://metrix-api.vercel.app',
    configService.get('CORS_ALLOWED_ORIGIN'),
  ];

  const errorMessage = 'Origin not allowed by CORS';

  app.enableCors({
    credentials: true,
    origin: (origin: string, callback) => {
      console.warn('Origin: ', origin);
      if (!origin) callback(new Error(errorMessage));

      const originIsWhitelisted = allowedOrigins.includes(origin);
      const originStartsOrEndsWithAllowed = allowedOrigins.some(
        (or) => origin.endsWith(or) || origin.startsWith(or),
      );

      if (!originIsWhitelisted || !originStartsOrEndsWithAllowed) {
        callback(new Error(errorMessage));
      }

      callback(null, true);
    },
  });
};
