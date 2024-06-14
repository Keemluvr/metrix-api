import BaseConfig from './BaseConfig';

export class ServerConfig extends BaseConfig {
  readonly siteName: string;
  readonly allowOrigins: string[];
  readonly port: number;
  readonly passSalt: string;
  readonly tokenSecret: string;
  readonly tokenMaxAge: number;

  constructor(cfg) {
    super(cfg);
  }
}
