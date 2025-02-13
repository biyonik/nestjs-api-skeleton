import { ISpecification } from '../../interfaces/specifications/specification.interface';
import { AndSpecification } from './and.specification';
import { OrSpecification } from './or.specification';
import { NotSpecification } from './not.specification';

export abstract class BaseSpecification<T> implements ISpecification<T> {
  abstract isSatisfiedBy(item: T): boolean;

  and(other: ISpecification<T>): ISpecification<T> {
    return new AndSpecification(this, other);
  }

  or(other: ISpecification<T>): ISpecification<T> {
    return new OrSpecification(this, other);
  }

  not(): ISpecification<T> {
    return new NotSpecification(this);
  }
}
