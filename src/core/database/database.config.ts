import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const configDB = {
  development: {
    dialect: process.env.DB_DIALECT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialectModule: pg,
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
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
  },
};

export default configDB;

module.exports = configDB;
