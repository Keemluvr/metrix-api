import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import rateLimit from 'express-rate-limit';
import { Logger } from 'nestjs-pino';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private rateLimit: any;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {
    this.rateLimit = rateLimit({
      windowMs: this.configService.server.rateLimitWindowMs,
      max: this.configService.server.rateLimitMax,

      handler: (req, res) => {
        const message = req.t('_error:tooManyRequest');
        // this.logger.debug({ message });
        res.status(429).json({ message });
      },
    });
  }

  use(request: Request, response: Response, next: () => void) {
    const req: any = request;
    const res: any = response;

    this.rateLimit(req, res, next);
  }
}
