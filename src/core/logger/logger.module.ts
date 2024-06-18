import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        genReqId: (req) => req.headers['x-request-id'],
        timestamp: () => `,"time":"${new Date().toISOString()}"`,
        autoLogging: false,
        useLevel: 'info',
        redact: {
          paths: ['*.headers.authorization', '*.headers.cookie'],
        },
        transport: {
          target: 'pino-pretty',
          options: { colorize: true, singleLine: true },
        },
        serializers: {
          req: (req) => {
            const { method, id, url, query } = req;
            return { body: req.body, id, method, url, query };
          },
        },
      },
    }),
  ],
})
export class LoggerModule {}
