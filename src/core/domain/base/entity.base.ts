export abstract class Entity<TId> {
  protected constructor(public id: TId) {}

  private _domainEvents: Array<any> = [];

  get domainEvents(): Array<any> {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: any): void {
    this._domainEvents.push(domainEvent);
  }

  public clearDomainEvents(): void {
    this._domainEvents = [];
  }

  public equals(other: Entity<TId>): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    if (this === other) {
      return true;
    }
    return this.id === other.id;
  }
}
