import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';

// Modules
import { AuthModule } from './infrastructure/auth/auth.module';

// Infrastructure
import { GlobalExceptionFilter } from './infrastructure/common/filters/http-exception.filter';
import { LoggingInterceptor } from './infrastructure/common/interceptors/logging.interceptor';
import { LoggerService } from './infrastructure/common/logging/logger.service';

// Database configuration function
const databaseConfig = (configService: ConfigService) =>
  ({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    synchronize: configService.get('NODE_ENV') === 'development',
    logging: configService.get('NODE_ENV') === 'development',
    ssl:
      configService.get('DB_SSL') === 'true'
        ? {
            rejectUnauthorized: false,
          }
        : false,
  }) as TypeOrmModuleOptions;

@Module({
  imports: [
    // Environment Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),

    // Database Connection
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: databaseConfig,
      inject: [ConfigService],
    }),

    // CQRS Module
    CqrsModule,

    // Feature Modules
    AuthModule,
  ],
  providers: [
    // Global Exception Filter
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },

    // Global Interceptors
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },

    // Logger Service
    LoggerService,
  ],
})
export class AppModule {}
