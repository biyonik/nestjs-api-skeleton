import { Injectable } from '@nestjs/common';
import { UserClaim } from 'src/core/domain/auth/user-claim.entity';
import { User } from 'src/core/domain/auth/user.entity';
import { BusinessRuleException } from 'src/core/exceptions/base/business-rule.exception';
import { NotFoundException } from 'src/core/exceptions/base/not-found.exception';
import { ICurrentUser } from 'src/core/interfaces/auth/current-user.interface';
import { IJwtService } from 'src/core/interfaces/auth/jwt-service.interface';
import { IPasswordHasher } from 'src/core/interfaces/auth/password-hasher.interface';
import { IRoleRepository } from 'src/core/interfaces/auth/repositories/role-repository.interface';
import { IUserRepository } from 'src/core/interfaces/auth/repositories/user-repository.interface';
import { IUserService } from 'src/core/interfaces/auth/user-service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly roleRepository: IRoleRepository,
    private readonly jwtService: IJwtService,
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async findByEmail(email: string): Promise<ICurrentUser | null> {
    const user = await this.userRepository.findByEmail(email);

    return {
      id: user.id,
      email: user.email,
      isActive: user.isActive,
      roles: user.roles,
      claims: user.claims,
      passwordHash: user.passwordHash,
      hasRole: (roleNames: string[]) => user.hasRole(roleNames),
      hasClaim: (type: string, value?: string) => user.hasClaim(type, value),
      hasAnyClaim: (claims: Array<{ type: string; value?: string }>) =>
        user.hasAnyClaim(claims),
    };
  }

  async getCurrentUser(userId: string): Promise<ICurrentUser | null> {
    const user = await this.userRepository.findWithRolesAndClaims(userId);
    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      isActive: user.isActive,
      roles: user.roles,
      claims: user.claims,
      hasRole: (roleNames: string[]) => user.hasRole(roleNames),
      hasClaim: (type: string, value?: string) => user.hasClaim(type, value),
      hasAnyClaim: (claims: Array<{ type: string; value?: string }>) =>
        user.hasAnyClaim(claims),
    };
  }

  async validateToken(token: string): Promise<ICurrentUser | null> {
    try {
      const payload = this.jwtService.verify<{ sub: string }>(token);
      return this.getCurrentUser(payload.sub);
    } catch {
      return null;
    }
  }

  async createUser(email: string, password: string): Promise<string> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new BusinessRuleException('User with this email already exists');
    }

    const passwordHash = await this.passwordHasher.hash(password);
    const user = User.create(email, passwordHash);
    await this.userRepository.create(user);
    return user.id;
  }

  async assignRole(userId: string, roleId: string): Promise<void> {
    const user = await this.userRepository.findWithRolesAndClaims(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const role = await this.roleRepository.findWithPermissions(roleId);
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    user.addRole(role);
    await this.userRepository.update(user);
  }

  async assignClaim(
    userId: string,
    claimType: string,
    claimValue: string,
  ): Promise<void> {
    const user = await this.userRepository.findWithRolesAndClaims(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const claim = UserClaim.create(claimType, claimValue);
    user.addClaim(claim);
    await this.userRepository.update(user);
  }

  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValid = await this.passwordHasher.verify(
      oldPassword,
      user.passwordHash,
    );
    if (!isValid) {
      throw new BusinessRuleException('Invalid old password');
    }

    const newPasswordHash = await this.passwordHasher.hash(newPassword);
    user.changePassword(newPasswordHash);
    await this.userRepository.update(user);
  }

  async deactivateUser(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.deactivate();
    await this.userRepository.update(user);
  }

  async activateUser(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.activate();
    await this.userRepository.update(user);
  }
}
