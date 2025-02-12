import { AggregateRoot } from '../../domain/base/aggregate-root.base';
import { ISpecification } from '../specifications/specification.interface';

export interface IRepository<T extends AggregateRoot<TId>, TId> {
  // Basic CRUD
  findById(id: TId): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  delete(id: TId): Promise<void>;

  // Batch operations
  createMany(entities: T[]): Promise<void>;
  updateMany(entities: T[]): Promise<void>;
  deleteMany(ids: TId[]): Promise<void>;

  // Advanced querying
  findOne(specification: ISpecification<T>): Promise<T | null>;
  findMany(specification: ISpecification<T>): Promise<T[]>;
  exists(specification: ISpecification<T>): Promise<boolean>;
  count(specification?: ISpecification<T>): Promise<number>;

  // Pagination
  findWithPagination(
    page: number,
    pageSize: number,
    specification?: ISpecification<T>,
  ): Promise<{
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }>;

  // Eager loading
  include(...propertyPath: string[]): IRepository<T, TId>;

  // Ordering
  orderBy(propertyPath: string, direction: 'ASC' | 'DESC'): IRepository<T, TId>;

  // Transaction support
  withTransaction(transaction: any): IRepository<T, TId>;
}
