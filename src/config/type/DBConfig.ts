import BaseConfig from './BaseConfig';
import { Dialect } from 'sequelize';
import { ModelCtor } from 'sequelize-typescript';
import pg from 'pg';

export default class DBConfig extends BaseConfig {
  readonly dialectModule: object;
  readonly dialect: Dialect;
  readonly database: string;
  readonly username: string;
  readonly password: string;
  readonly host: string;
  readonly port: number;
  readonly models: string[] | ModelCtor[];
  readonly dialectOptions: object;

  constructor(cfg) {
    super(cfg);
    this.dialectModule = pg;
    this.dialect = (process.env.DB_DIALECT as Dialect) || this.dialect;
    this.database = process.env.DB_NAME || this.database;
    this.username = process.env.DB_USER || this.username;
    this.password = process.env.DB_PASS || this.password;
    this.host = process.env.DB_HOST || this.host;
    this.port = Number(process.env.DB_PORT) || this.port;
  }
}
