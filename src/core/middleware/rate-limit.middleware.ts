import { Injectable, NestMiddleware } from '@nestjs/common';
import { AppService } from '../../app.service';
import { ConfigService } from '../../config/config.service';
import rateLimit from 'express-rate-limit';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private rateLimit: any;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: AppService,
  ) {
    this.rateLimit = rateLimit({
      windowMs: this.configService.server.rateLimitWindowMs,
      max: this.configService.server.rateLimitMax,
      message: 'too-many-requests',
    });
  }

  use(request: Request, response: Response, next: () => void) {
    const req: any = request;
    const res: any = response;

    this.rateLimit(req, res, next);
  }
}
