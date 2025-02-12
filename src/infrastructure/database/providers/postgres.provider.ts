import { DataSource } from 'typeorm';
import { DatabaseProvider } from './database-provider.abstract';

export class PostgresProvider extends DatabaseProvider {
  private dataSource: DataSource | null = null;

  async createConnection(): Promise<DataSource> {
    this.dataSource = new DataSource({
      type: 'postgres',
      host: this.config.host,
      port: this.config.port,
      username: this.config.username,
      password: this.config.password,
      database: this.config.database,
      schema: this.config.schema,
      ssl: this.config.ssl,
      synchronize: false,
      logging: process.env.NODE_ENV === 'development',
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/migrations/*{.ts,.js}'],
      extra: this.config.extra,
    });

    await this.dataSource.initialize();
    return this.dataSource;
  }

  async closeConnection(): Promise<void> {
    if (this.dataSource) {
      await this.dataSource.destroy();
      this.dataSource = null;
    }
  }

  getConnection(): DataSource {
    if (!this.dataSource) {
      throw new Error('Database connection not initialized');
    }
    return this.dataSource;
  }
}
