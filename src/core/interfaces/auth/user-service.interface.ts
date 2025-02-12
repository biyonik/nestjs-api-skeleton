import { ICurrentUser } from './current-user.interface';

export interface IUserService {
  findByEmail(email: string): Promise<ICurrentUser | null>;
  getCurrentUser(userId: string): Promise<ICurrentUser | null>;
  validateToken(token: string): Promise<ICurrentUser | null>;
  createUser(email: string, password: string): Promise<string>;
  assignRole(userId: string, roleId: string): Promise<void>;
  assignClaim(
    userId: string,
    claimType: string,
    claimValue: string,
  ): Promise<void>;
  changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<void>;
  deactivateUser(userId: string): Promise<void>;
  activateUser(userId: string): Promise<void>;
}
