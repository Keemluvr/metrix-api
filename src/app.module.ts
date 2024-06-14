import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeTransactionalModule } from 'sequelize-transactional-decorator';
import { databaseProviders } from './core/database/database.providers';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { UserModule } from './modules/user/user.module';
import { UserController } from './modules/user/user.controller';
import { AuthService } from './modules/auth/auth.service';
import { AuthModule } from './modules/auth/auth.module';
import { CorsMiddleware } from './core/middleware/cors.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    SequelizeModule.forRootAsync(databaseProviders),
    SequelizeTransactionalModule.register(),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, AuthService],
})
export class AppModule implements NestModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer) {
    const middlewares = [CorsMiddleware];

    consumer
      .apply(...middlewares)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
