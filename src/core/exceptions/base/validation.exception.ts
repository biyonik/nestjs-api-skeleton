import { ApplicationException } from './application.exception';

export class ValidationException extends ApplicationException {
  constructor(
    message: string,
    public readonly errors: Record<string, string[]>,
  ) {
    super(`Validation Error: ${message}`);
  }
}
