import { BaseSpecification } from './base.specification';
import { ISpecification } from '../../interfaces/specifications/specification.interface';

export class NotSpecification<T> extends BaseSpecification<T> {
  constructor(private readonly specification: ISpecification<T>) {
    super();
  }

  isSatisfiedBy(item: T): boolean {
    return !this.specification.isSatisfiedBy(item);
  }
}
