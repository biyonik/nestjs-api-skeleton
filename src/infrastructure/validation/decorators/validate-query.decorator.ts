import { validateSync } from 'class-validator';
import { ValidationException } from 'src/core/exceptions/base/validation.exception';
import { formatErrors } from '../utils/error-formatter.util';

export function ValidateQuery() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const query = args[0];
      const errors = validateSync(query, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });

      if (errors.length > 0) {
        throw new ValidationException(
          'Query validation failed',
          formatErrors(errors),
        );
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
