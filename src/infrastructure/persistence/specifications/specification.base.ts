import { ISpecification } from 'src/core/interfaces/specifications/specification.interface';
import { SelectQueryBuilder } from 'typeorm';

export abstract class BaseSpecification<T> implements ISpecification<T> {
  abstract apply(query: SelectQueryBuilder<T>): void;
}
