import { Module, Global } from '@nestjs/common';
import { CacheManager } from './cache/cache-manager';
import { LoggerService } from './logging/logger.service';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { GlobalExceptionFilter } from './filters/http-exception.filter';
import { AuthGuard } from './guards/auth.guard';

@Global()
@Module({
  providers: [
    CacheManager,
    LoggerService,
    LoggingInterceptor,
    GlobalExceptionFilter,
    AuthGuard,
  ],
  exports: [
    CacheManager,
    LoggerService,
    LoggingInterceptor,
    GlobalExceptionFilter,
    AuthGuard,
  ],
})
export class CommonModule {}
