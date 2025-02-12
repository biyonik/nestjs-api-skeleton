import { UserClaim } from '../../domain/auth/user-claim.entity';
import { Role } from '../../domain/auth/role.entity';

export interface ICurrentUser {
  id: string;
  email: string;
  isActive: boolean;
  roles: Role[];
  claims: UserClaim[];
  passwordHash?: string;
  hasRole(roleNames: string[]): boolean;
  hasClaim(type: string, value?: string): boolean;
  hasAnyClaim(claims: Array<{ type: string; value?: string }>): boolean;
}
