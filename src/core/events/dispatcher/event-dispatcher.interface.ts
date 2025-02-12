import { BaseEvent } from '../base/base-event';
import { IEventHandler } from '../../interfaces/event-handler';

export interface IEventDispatcher {
  dispatch<TEvent extends BaseEvent>(event: TEvent): Promise<void>;
  register<TEvent extends BaseEvent>(
    eventType: string,
    handler: IEventHandler<TEvent>,
  ): void;
  clearHandlers(): void;
}
