import { DomainException } from './domain.exception';

export class ValueObjectException extends DomainException {
  constructor(
    message: string,
    public readonly valueObjectName: string,
  ) {
    super(`Value Object (${valueObjectName}) Error: ${message}`);
  }
}
