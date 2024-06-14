import { ConfigService } from '@nestjs/config';

export default async (app) => {
  const configService = app.get(ConfigService);

  const allowedOrigins = [
    'http://localhost',
    `http://localhost:${configService.get('PORT')}`,
    'https://metrix-api.vercel.app',
    configService.get('CORS_ALLOWED_ORIGIN'),
  ];

  const errorMessage = 'Origin not allowed by CORS';

  app.enableCors({
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
    methods: 'GET, HEAD, PUT, POST, DELETE, OPTIONS, PATCH',
    credentials: true,
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authentication, Access-control-allow-credentials, Access-control-allow-headers, Access-control-allow-methods, Access-control-allow-origin, User-Agent, Referer, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Cache-Control, Pragma',
  });
};
