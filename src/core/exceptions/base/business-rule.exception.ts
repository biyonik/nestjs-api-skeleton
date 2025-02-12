import { DomainException } from './domain.exception';

export class BusinessRuleException extends DomainException {
  constructor(
    message: string,
    public readonly ruleName: string,
  ) {
    super(`Business Rule (${ruleName}) Violation: ${message}`);
  }
}
