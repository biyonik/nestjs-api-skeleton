import { IDatabaseConfig } from '../interfaces/database-config.interface';

export abstract class DatabaseProvider {
  protected config: IDatabaseConfig;

  constructor(config: IDatabaseConfig) {
    this.config = config;
  }

  abstract createConnection(): Promise<any>;
  abstract closeConnection(): Promise<void>;
  abstract getConnection(): any;
}
