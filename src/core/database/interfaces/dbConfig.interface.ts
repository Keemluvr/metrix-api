import { SequelizeModuleOptions } from '@nestjs/sequelize';

export interface IDatabaseConfig {
  development: SequelizeModuleOptions;
  production: SequelizeModuleOptions;
}
