import { Injectable } from '@nestjs/common';
import defaultConfig from './cfg.default';
import DBConfig from './type/DBConfig';
import { ServerConfig } from './type/ServerConfig';

@Injectable()
export class ConfigService {
  public readonly DEVELOPMENT = 'development';
  readonly PRODUCTION = 'production';

  readonly env: string;
  readonly db: DBConfig;
  readonly server: ServerConfig;

  constructor() {
    this.env = process.env.NODE_ENV || this.DEVELOPMENT;

    this.db = new DBConfig(defaultConfig.db);
    this.server = new ServerConfig(defaultConfig.server);
  }

  getServer<T>(key: string): T {
    return this.server[key] as T;
  }
}
