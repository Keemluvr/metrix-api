import { Injectable, NestMiddleware } from '@nestjs/common';
import helmet from 'helmet';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class HelmetMiddleware implements NestMiddleware {
  private helmet: any;

  constructor(private readonly configService: ConfigService) {
    this.helmet = helmet();
  }

  use(request: Request, response: Response, next: () => void) {
    const req: any = request;
    const res: any = response;

    this.helmet(req, res, next);
  }
}
