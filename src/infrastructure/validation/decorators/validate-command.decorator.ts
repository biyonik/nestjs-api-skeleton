import { validateSync } from 'class-validator';
import { ValidationException } from 'src/core/exceptions/base/validation.exception';
import { formatErrors } from '../utils/error-formatter.util';

export function ValidateCommand() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const command = args[0];
      const errors = validateSync(command, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });

      if (errors.length > 0) {
        throw new ValidationException(
          'Command validation failed',
          formatErrors(errors),
        );
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
