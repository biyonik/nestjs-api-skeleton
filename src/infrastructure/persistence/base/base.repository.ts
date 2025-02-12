import {
  Repository,
  EntityManager,
  FindOptionsWhere,
  SelectQueryBuilder,
} from 'typeorm';
import { AggregateRoot } from '../../../core/domain/base/aggregate-root.base';
import { IRepository } from 'src/core/interfaces/repository/repository.interface';
import { ISpecification } from '../../../core/interfaces/specifications/specification.interface';
import { Page } from '../../../core/shared/types/page.type';

export abstract class BaseRepository<T extends AggregateRoot<TId>, TId>
  implements IRepository<T, TId>
{
  protected constructor(
    protected readonly repository: Repository<T>,
    protected readonly manager: EntityManager,
  ) {}

  async findById(id: TId): Promise<T | null> {
    return this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
    });
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async create(entity: T): Promise<void> {
    await this.repository.save(entity);
  }

  async update(entity: T): Promise<void> {
    await this.repository.save(entity);
  }

  async delete(id: TId): Promise<void> {
    await this.repository.delete(id);
  }

  async createMany(entities: T[]): Promise<void> {
    await this.repository.save(entities);
  }

  async updateMany(entities: T[]): Promise<void> {
    await this.repository.save(entities);
  }

  async deleteMany(ids: TId[]): Promise<void> {
    await this.repository.delete(ids);
  }

  async findOne(specification: ISpecification<T>): Promise<T | null> {
    const queryBuilder = this.createQueryBuilder();
    this.applySpecification(queryBuilder, specification);
    return queryBuilder.getOne();
  }

  async findMany(specification: ISpecification<T>): Promise<T[]> {
    const queryBuilder = this.createQueryBuilder();
    this.applySpecification(queryBuilder, specification);
    return queryBuilder.getMany();
  }

  async exists(specification: ISpecification<T>): Promise<boolean> {
    const count = await this.count(specification);
    return count > 0;
  }

  async count(specification?: ISpecification<T>): Promise<number> {
    const queryBuilder = this.createQueryBuilder();
    if (specification) {
      this.applySpecification(queryBuilder, specification);
    }
    return queryBuilder.getCount();
  }

  async findWithPagination(
    page: number,
    pageSize: number,
    specification?: ISpecification<T>,
  ): Promise<Page<T>> {
    const queryBuilder = this.createQueryBuilder();

    if (specification) {
      this.applySpecification(queryBuilder, specification);
    }

    const [items, total] = await queryBuilder
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    const totalPages = Math.ceil(total / pageSize);

    return {
      items,
      total,
      page,
      pageSize,
      totalPages,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    };
  }

  protected createQueryBuilder(): SelectQueryBuilder<T> {
    return this.repository.createQueryBuilder();
  }

  protected abstract applySpecification(
    queryBuilder: SelectQueryBuilder<T>,
    specification: ISpecification<T>,
  ): void;
}
