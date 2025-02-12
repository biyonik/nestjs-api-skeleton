import { DomainException } from './domain.exception';

export class EntityException extends DomainException {
  constructor(
    message: string,
    public readonly entityName: string,
    public readonly entityId?: string,
  ) {
    super(
      `Entity (${entityName}) Error: ${message}${entityId ? ` [ID: ${entityId}]` : ''}`,
    );
  }
}
