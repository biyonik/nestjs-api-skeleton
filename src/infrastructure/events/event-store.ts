import { Injectable } from '@nestjs/common';
import { IEventStore } from 'src/core/events/store/event-store.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoredEvent } from './stored-event.entity';
import { DomainEvent } from 'src/core/events/domain/domain-event';

@Injectable()
export class EventStore implements IEventStore {
  constructor(
    @InjectRepository(StoredEvent)
    private readonly eventRepository: Repository<StoredEvent>,
  ) {}

  async saveEvent<TEvent extends DomainEvent>(event: TEvent): Promise<void> {
    const storedEvent = new StoredEvent({
      eventType: event.constructor.name,
      eventBody: JSON.stringify(event),
      aggregateId: event.aggregateId,
      occurredOn: event.occurredOn,
      version: event.version,
    });

    await this.eventRepository.save(storedEvent);
  }

  async getEvents(aggregateId: string): Promise<DomainEvent[]> {
    const storedEvents = await this.eventRepository.find({
      where: { aggregateId },
      order: { version: 'ASC' },
    });

    return storedEvents.map(this.deserializeEvent);
  }

  async getEventsByType(eventType: string): Promise<DomainEvent[]> {
    const storedEvents = await this.eventRepository.find({
      where: { eventType },
      order: { occurredOn: 'ASC' },
    });

    return storedEvents.map(this.deserializeEvent);
  }

  private deserializeEvent(storedEvent: StoredEvent): DomainEvent {
    const eventData = JSON.parse(storedEvent.eventBody);
    // Event reconstruction logic here
    return Object.assign(Object.create(eventData), eventData);
  }
}
