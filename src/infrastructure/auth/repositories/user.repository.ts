import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../persistence/base/base.repository';
import { User } from '../../../core/domain/auth/user.entity';
import { IUserRepository } from '../../../core/interfaces/auth/repositories/user-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository, SelectQueryBuilder } from 'typeorm';
import { ISpecification } from 'src/core/interfaces/specifications/specification.interface';

@Injectable()
export class UserRepository
  extends BaseRepository<User, string>
  implements IUserRepository
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {
    super(userRepository, entityManager);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async findByRoleId(roleId: string): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user.roles', 'role')
      .where('role.id = :roleId', { roleId })
      .getMany();
  }

  async findWithRolesAndClaims(userId: string): Promise<User | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .leftJoinAndSelect('user.claims', 'claim')
      .where('user.id = :userId', { userId })
      .getOne();
  }

  protected applySpecification(
    queryBuilder: SelectQueryBuilder<User>,
    specification: ISpecification<User>,
  ): void {
    // Specification'ı query builder'a uygula
    const specAny = specification as any;
    if (typeof specAny.apply === 'function') {
      specAny.apply(queryBuilder);
    }
  }
}
