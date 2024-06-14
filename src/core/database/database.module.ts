import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeTransactionalModule } from 'sequelize-transactional-decorator';
import { ConfigService } from '../../config/config.service';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.db,
    }),
    SequelizeTransactionalModule.register(),
  ],
})
export class DatabaseModule {}
