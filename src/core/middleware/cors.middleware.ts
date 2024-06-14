import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  constructor() {}

  use(request: Request, response: Response, next: () => void) {
    const req: any = request;

    req.headers.origin = req.headers.origin || req.headers.host;
    console.log('>', req.headers);

    next();
  }
}
