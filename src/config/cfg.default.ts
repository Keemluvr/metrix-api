import * as path from 'path';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const port = process.env.PORT;

export default {
  db: {
    dialect: process.env.DB_DIALECT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialectModule: pg,
    models: [
      path.join(path.dirname(__dirname), 'modules/**/entities/*.entity.js'),
    ],
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
  },
  server: {
    siteName: 'Metrix',
    allowOrigins: [
      'http://localhost',
      `http://localhost:${port}`,
      'https://metrix-api.vercel.app',
      process.env.CORS_ALLOWED_ORIGIN,
    ],
    port,
    passSalt: 'u5o2law8xi',
    tokenSecret: process.env.PRIVATE_KEY,
    tokenMaxAge: process.env.TOKEN_EXPIRATION,
  },
};
