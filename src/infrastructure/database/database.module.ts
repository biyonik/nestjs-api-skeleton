import { DataSourceOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createDatabaseConfig } from './config/database.config';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (): Promise<DataSourceOptions> => {
        const config = createDatabaseConfig();

        if (config.type !== 'postgres') {
          throw new Error(`Database type ${config.type} is not supported yet`);
        }

        return {
          type: 'postgres',
          host: config.host,
          port: config.port,
          username: config.username,
          password: config.password,
          database: config.database,
          schema: config.schema,
          ssl: config.ssl,
          autoLoadEntities: true,
          synchronize: false,
          logging: process.env.NODE_ENV === 'development',
          extra: config.extra,
        } as DataSourceOptions;
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
