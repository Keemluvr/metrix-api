module.exports = {
  development: {
    dialect: 'sqlite',
    storage: 'src/core/database/database.sqlite',
    autoLoadModels: true,
    synchronize: true,
    models: [__dirname + '/src/modules/**/entities/*.entity.ts'],
  },
  production: {
    dialect: process.env.DB_DIALECT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
  },
};
