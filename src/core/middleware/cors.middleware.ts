import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(request: Request, response: Response, next: () => void) {
    const req: any = request;
    const res: any = response;

    const origin = req.headers.origin || req.headers.host;
    const { allowOrigins, siteName, id } = this.configService.server;

    const isAllowedOrigin = allowOrigins.includes(origin);

    const startAndEndWithAllowedOrigin =
      origin.startsWith(`${siteName}-`) && origin.endsWith(`-${id}.vercel.app`);

    if (!isAllowedOrigin && !startAndEndWithAllowedOrigin) {
      throw new UnauthorizedException({ message: 'Not allowed origin' });
    }

    res.header('Access-Control-Allow-Origin', origin);
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS,HEAD,PUT,POST,GET,DELETE',
    );

    next();
  }
}
