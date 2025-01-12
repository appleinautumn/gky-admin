const path = require('path');
require('dotenv').config();

module.exports = {
  development: {
    dialect: process.env.DB_DIALECT || 'sqlite',
    storage: process.env.DB_DEV || path.resolve(__dirname, '../../dev.sqlite3'),
    logging: process.env.DB_LOGGING === 'true',
  },
  test: {
    dialect: process.env.DB_DIALECT || 'sqlite',
    storage: process.env.DB_TEST || ':memory:',
    logging: process.env.DB_LOGGING === 'true',
  },
  production: {
    dialect: process.env.DB_DIALECT || 'sqlite',
    storage:
      process.env.DB_PROD || path.resolve(__dirname, '../../prod.sqlite3'),
    logging: process.env.DB_LOGGING === 'true',
  },
};
