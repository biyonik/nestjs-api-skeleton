export interface IDatabaseConfig {
  type: 'postgres' | 'mysql' | 'sqlite';
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  database: string;
  schema?: string;
  ssl?: boolean;
  extra?: Record<string, any>;
}
