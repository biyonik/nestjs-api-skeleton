import { DomainException } from './domain.exception';

export class BusinessRuleException extends DomainException {
  constructor(
    message: string,
    public readonly ruleName?: string,
  ) {
    super(
      ruleName != null
        ? `Business Rule (${ruleName}) Violation: ${message}`
        : `Business Rule Exception: ${message}`,
    );
  }
}
