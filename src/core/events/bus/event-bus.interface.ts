import { BaseEvent } from '../base/base-event';
import { IEventHandler } from '../../interfaces/event-handler';

export interface IEventBus {
  publish<TEvent extends BaseEvent>(event: TEvent): Promise<void>;
  subscribe<TEvent extends BaseEvent>(
    eventType: string,
    handler: IEventHandler<TEvent>,
  ): void;
  unsubscribe<TEvent extends BaseEvent>(
    eventType: string,
    handler: IEventHandler<TEvent>,
  ): void;
}
