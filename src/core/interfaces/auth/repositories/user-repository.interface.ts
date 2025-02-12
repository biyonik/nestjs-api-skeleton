import { IRepository } from '../../repository/repository.interface';
import { User } from '../../../domain/auth/user.entity';

export interface IUserRepository extends IRepository<User, string> {
  findByEmail(email: string): Promise<User | null>;
  findByRoleId(roleId: string): Promise<User[]>;
  findWithRolesAndClaims(userId: string): Promise<User | null>;
}
