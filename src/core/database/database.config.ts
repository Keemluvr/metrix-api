import dotenv from 'dotenv';
import * as path from 'path';
import pg from 'pg';

dotenv.config();

const modelsPath = path.join(
  path.dirname(__dirname),
  '..',
  'modules/**/entities/*.entity.js',
);

const configDB = {
  development: {
    dialect: process.env.DB_DIALECT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialectModule: pg,
    models: [modelsPath],
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
  },
  production: {
    dialect: process.env.DB_DIALECT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialectModule: pg,
    models: [modelsPath],
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
  },
};

export default configDB;

module.exports = configDB;
