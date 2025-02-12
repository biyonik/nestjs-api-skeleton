import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { LogLevel } from 'src/core/common/constants/log-level.constant';

@Injectable()
export class LoggerService implements NestLoggerService {
  log(message: string, context?: string): void {
    this.writeLog(LogLevel.INFO, message, context);
  }

  error(message: string, trace?: string, context?: string): void {
    this.writeLog(LogLevel.ERROR, message, context, trace);
  }

  warn(message: string, context?: string): void {
    this.writeLog(LogLevel.WARN, message, context);
  }

  debug(message: string, context?: string): void {
    this.writeLog(LogLevel.DEBUG, message, context);
  }

  private writeLog(
    level: LogLevel,
    message: string,
    context?: string,
    trace?: string,
  ): void {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      context: context || 'Application',
      message,
      ...(trace && { trace }),
    };

    // In production, you might want to use a proper logging service
    console.log(JSON.stringify(logEntry));
  }
}
