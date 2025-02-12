import { EntityManager } from 'typeorm';
import { IUnitOfWork } from '../../../core/interfaces/unit-of-work.interface';

export class UnitOfWork implements IUnitOfWork {
  constructor(private readonly manager: EntityManager) {}

  async begin(): Promise<void> {
    await this.manager.queryRunner?.startTransaction();
  }

  async commit(): Promise<void> {
    await this.manager.queryRunner?.commitTransaction();
  }

  async rollback(): Promise<void> {
    await this.manager.queryRunner?.rollbackTransaction();
  }
}
