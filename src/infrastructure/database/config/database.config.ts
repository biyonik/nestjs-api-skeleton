import { IDatabaseConfig } from '../interfaces/database-config.interface';

export const createDatabaseConfig = (): IDatabaseConfig => {
  return {
    type:
      (process.env.DB_TYPE as 'postgres' | 'mysql' | 'sqlite') || 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'app_db',
    schema: process.env.DB_SCHEMA || 'public',
    ssl: process.env.DB_SSL === 'true',
    extra: {
      max: process.env.DB_MAX_CONNECTIONS
        ? parseInt(process.env.DB_MAX_CONNECTIONS, 10)
        : 100,
    },
  };
};
