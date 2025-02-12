import { DomainEvent } from '../../base/domain-event.base';

export class UserDeactivatedEvent extends DomainEvent {
  constructor(public readonly userId: string) {
    super();
  }
}
