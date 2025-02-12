import { DomainEvent } from '../../base/domain-event.base';

export class UserPasswordChangedEvent extends DomainEvent {
  constructor(public readonly userId: string) {
    super();
  }
}
