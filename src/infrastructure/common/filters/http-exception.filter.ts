import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { LoggerService } from '../logging/logger.service';
import { ValidationException } from 'src/core/exceptions/base/validation.exception';
import { BusinessRuleException } from 'src/core/exceptions/base/business-rule.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let details = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else if (exception instanceof ValidationException) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
      details = exception.errors;
    } else if (exception instanceof BusinessRuleException) {
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      message = exception.message;
    }

    this.logger.error(message, exception.stack);

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
      ...(details && { details }),
    });
  }
}
