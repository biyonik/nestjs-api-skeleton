import { DomainEvent } from '../domain/domain-event';

export interface IEventStore {
  saveEvent<TEvent extends DomainEvent>(event: TEvent): Promise<void>;
  getEvents(aggregateId: string): Promise<DomainEvent[]>;
  getEventsByType(eventType: string): Promise<DomainEvent[]>;
}
