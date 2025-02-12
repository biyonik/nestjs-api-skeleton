export abstract class BaseEvent {
  public readonly occurredOn: Date;
  public readonly eventType: string;

  protected constructor() {
    this.occurredOn = new Date();
    this.eventType = this.constructor.name;
  }
}
