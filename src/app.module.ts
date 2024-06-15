import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { UserModule } from './modules/user/user.module';
import { UserController } from './modules/user/user.controller';
import { AuthService } from './modules/auth/auth.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './core/database/database.module';

import { CorsMiddleware } from './core/middleware/cors.middleware';
import { HelmetMiddleware } from './core/middleware/helmet.middleware';

@Module({
  imports: [ConfigModule, DatabaseModule, AuthModule, UserModule],
  controllers: [AppController, UserController],
  providers: [AppService, AuthService],
})
export class AppModule implements NestModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer) {
    const middlewares = [CorsMiddleware, HelmetMiddleware];

    consumer
      .apply(...middlewares)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
