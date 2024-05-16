import { ConfigService } from '@nestjs/config';
import { DEVELOPMENT } from '../constants';
import databaseConfig from './database.config';

export const databaseProviders = {
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => {
    const environment = config.get('NODE_ENV') || DEVELOPMENT;
    const database = databaseConfig[environment];

    return database;
  },
};
