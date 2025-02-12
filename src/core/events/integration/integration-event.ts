import { BaseEvent } from '../base/base-event';

export abstract class IntegrationEvent extends BaseEvent {
  public readonly id: string;
  public readonly correlationId?: string;

  protected constructor(id: string, correlationId?: string) {
    super();
    this.id = id;
    this.correlationId = correlationId;
  }
}
