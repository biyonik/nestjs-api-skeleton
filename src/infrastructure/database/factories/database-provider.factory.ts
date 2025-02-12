import { DatabaseProvider } from '../providers/database-provider.abstract';
import { IDatabaseConfig } from '../interfaces/database-config.interface';
import { PostgresProvider } from '../providers/postgres.provider';

export class DatabaseProviderFactory {
  static create(config: IDatabaseConfig): DatabaseProvider {
    switch (config.type) {
      case 'postgres':
        return new PostgresProvider(config);
      // case 'mysql':
      //     return new MySQLProvider(config);
      // case 'sqlite':
      //     return new SQLiteProvider(config);
      default:
        throw new Error(`Unsupported database type: ${config.type}`);
    }
  }
}
