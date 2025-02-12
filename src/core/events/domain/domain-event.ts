import { BaseEvent } from '../base/base-event';

export abstract class DomainEvent extends BaseEvent {
  public readonly aggregateId: string;
  public readonly version: number;

  protected constructor(aggregateId: string, version: number = 1) {
    super();
    this.aggregateId = aggregateId;
    this.version = version;
  }
}
