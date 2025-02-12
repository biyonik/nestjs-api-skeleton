import { IEventBus } from 'src/core/events/bus/event-bus.interface';
import { IEventHandler } from 'src/core/interfaces/event-handler';
import { Injectable } from '@nestjs/common';
import { BaseEvent } from 'src/core/events/base/base-event';

@Injectable()
export class EventBus implements IEventBus {
  private handlers: Map<string, IEventHandler<BaseEvent>[]> = new Map();

  async publish<TEvent extends BaseEvent>(event: TEvent): Promise<void> {
    const eventType = event.constructor.name;
    const handlers = this.handlers.get(eventType) || [];

    const promises = handlers.map((handler) =>
      handler.handle(event).catch((error) => {
        console.error(`Error handling event ${eventType}:`, error);
        throw error;
      }),
    );

    await Promise.all(promises);
  }

  subscribe<TEvent extends BaseEvent>(
    eventType: string,
    handler: IEventHandler<TEvent>,
  ): void {
    const handlers = this.handlers.get(eventType) || [];
    handlers.push(handler as IEventHandler<BaseEvent>);
    this.handlers.set(eventType, handlers);
  }

  unsubscribe<TEvent extends BaseEvent>(
    eventType: string,
    handler: IEventHandler<TEvent>,
  ): void {
    const handlers = this.handlers.get(eventType) || [];
    const index = handlers.indexOf(handler as IEventHandler<BaseEvent>);
    if (index > -1) {
      handlers.splice(index, 1);
    }
    this.handlers.set(eventType, handlers);
  }
}
