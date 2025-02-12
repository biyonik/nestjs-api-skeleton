import { BaseException } from './base.exception';

export class DomainException extends BaseException {
  constructor(message: string) {
    super(`Domain Exception: ${message}`);
  }
}
