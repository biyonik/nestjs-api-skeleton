import { BaseEvent } from '../base/base-event';

export interface IEventHandler<TEvent extends BaseEvent> {
  handle(event: TEvent): Promise<void>;
}
