import { DomainEvent } from '../../base/domain-event.base';

export class UserClaimAddedEvent extends DomainEvent {
  constructor(
    public readonly userId: string,
    public readonly claimType: string,
    public readonly claimValue: string,
  ) {
    super();
  }
}
