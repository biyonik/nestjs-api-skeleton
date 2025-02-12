import { Injectable } from '@nestjs/common';
import { Role } from 'src/core/domain/auth/role.entity';
import { BaseRepository } from 'src/infrastructure/persistence/base/base.repository';
import { IRoleRepository } from '../../../core/interfaces/auth/repositories/role-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository, SelectQueryBuilder } from 'typeorm';
import { ISpecification } from 'src/core/interfaces/specifications/specification.interface';

@Injectable()
export class RoleRepository
  extends BaseRepository<Role, string>
  implements IRoleRepository
{
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly entityManager: EntityManager,
  ) {
    super(roleRepository, entityManager);
  }

  async findByName(name: string): Promise<Role | null> {
    return this.roleRepository.findOne({
      where: { name },
    });
  }

  async findWithPermissions(roleId: string): Promise<Role | null> {
    return this.roleRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.permissions', 'permission')
      .where('role.id = :roleId', { roleId })
      .getOne();
  }

  protected applySpecification(
    queryBuilder: SelectQueryBuilder<Role>,
    specification: ISpecification<Role>,
  ): void {
    // Specification'ı query builder'a uygula
    const specAny = specification as any;
    if (typeof specAny.apply === 'function') {
      specAny.apply(queryBuilder);
    }
  }
}
