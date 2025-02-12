import { Entity } from './entity.base';

export abstract class AggregateRoot<TId> extends Entity<TId> {
  protected constructor(id: TId) {
    super(id);
  }
}
