import { ConfigService } from '@nestjs/config';

export default async (app) => {
  const configService = app.get(ConfigService);

  const allowedOrigins = [
    'http://localhost',
    `http://localhost:${configService.get('PORT')}`,
    'https://metrix-api.vercel.app',
    configService.get('CORS_ALLOWED_ORIGIN'),
  ];

  app.use(function (req, res, next) {
    console.log(req.headers);
    req.headers.origin = req.headers.origin || req.headers.host;
    next();
  });

  app.enableCors({
    origin: (origin: string, callback) => {
      console.warn('Origin: ', origin);
      const errorMessage = `Origin ${origin} not allowed by CORS`;

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
      'Content-Type, Access-Control-Allow-Credentials, Authorization',
  });
};
