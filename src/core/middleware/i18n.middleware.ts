import { Injectable, NestMiddleware } from '@nestjs/common';
import { en, pt } from 'src/config/locales';
import i18next from 'i18next';
import i18nextHttpMiddleware from 'i18next-http-middleware';
import Backend from 'i18next-fs-backend';

@Injectable()
export class I18nMiddleware implements NestMiddleware {
  constructor() {
    i18next
      .use(Backend)
      .use(i18nextHttpMiddleware.LanguageDetector)
      .init({
        fallbackLng: 'en',
        preload: ['en', 'pt'],
        resources: { en, pt },
        detection: {
          order: ['header', 'querystring', 'cookie'],
          caches: ['cookie'],
        },
        debug: false,
        // saveMissing: true,
      });
  }

  use(request: Request, response: Response, next: () => void) {
    i18nextHttpMiddleware.handle(i18next)(
      request as any,
      response as any,
      next,
    );
  }
}
