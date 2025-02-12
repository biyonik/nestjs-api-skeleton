import { IRepository } from '../../repository/repository.interface';
import { Role } from '../../../domain/auth/role.entity';

export interface IRoleRepository extends IRepository<Role, string> {
  findByName(name: string): Promise<Role | null>;
  findWithPermissions(roleId: string): Promise<Role | null>;
}
