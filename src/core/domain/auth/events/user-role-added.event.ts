import { DomainEvent } from '../../base/domain-event.base';

export class UserRoleAddedEvent extends DomainEvent {
  constructor(
    public readonly userId: string,
    public readonly roleId: string,
  ) {
    super();
  }
}
