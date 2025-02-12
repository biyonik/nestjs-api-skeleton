import { BaseException } from './base.exception';

export class ApplicationException extends BaseException {
  constructor(message: string) {
    super(`Application Exception: ${message}`);
  }
}
