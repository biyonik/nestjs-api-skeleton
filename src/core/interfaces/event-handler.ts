import { DomainEvent } from '../domain/base/domain-event.base';

export interface IEventHandler<TEvent extends DomainEvent> {
  handle(event: TEvent): Promise<void>;
}
