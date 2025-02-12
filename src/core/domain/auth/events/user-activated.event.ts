import { DomainEvent } from '../../base/domain-event.base';

export class UserActivatedEvent extends DomainEvent {
  constructor(public readonly userId: string) {
    super();
  }
}
