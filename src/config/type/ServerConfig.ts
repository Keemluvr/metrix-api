import BaseConfig from './BaseConfig';

export class ServerConfig extends BaseConfig {
  readonly id: string;
  readonly siteName: string;
  readonly allowOrigins: string[];
  readonly port: number;
  readonly passSalt: string;
  readonly tokenSecret: string;
  readonly tokenMaxAge: number;

  constructor(cfg) {
    super(cfg);
    this.id = process.env.VERCEL_ID || this.id;
  }
}
