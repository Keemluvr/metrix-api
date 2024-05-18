import dotenv from 'dotenv';

dotenv.config();

const configDB = {
  development: {
    dialect: 'sqlite',
    autoLoadModels: true,
    synchronize: true,
    logging: true,
    storage: 'src/core/database/database.sqlite',
  },
  production: {
    dialect: process.env.DB_DIALECT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
  },
};

export default configDB;

module.exports = configDB;
