import { UnauthorizedException } from 'src/core/exceptions/base/unauthorized.exception';
import { ICurrentUser } from '../../../interfaces/auth/current-user.interface';

export interface RequiredPermissions {
  roles?: string[];
  claims?: Array<{
    type: string;
    value?: string;
  }>;
}

export function RequirePermissions(permissions: RequiredPermissions) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const command = args[0];
      const currentUser = await this.getCurrentUser(command.userId);

      if (!currentUser) {
        throw new UnauthorizedException('User not found');
      }

      const hasRequiredPermissions = validatePermissions(
        currentUser,
        permissions,
      );

      if (!hasRequiredPermissions) {
        throw new UnauthorizedException('Insufficient permissions');
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

function validatePermissions(
  currentUser: ICurrentUser,
  permissions: RequiredPermissions,
): boolean {
  // Role kontrolü
  if (permissions.roles?.length > 0) {
    const hasRequiredRole = currentUser.hasRole(permissions.roles);
    if (!hasRequiredRole) {
      return false;
    }
  }

  // Claim kontrolü
  if (permissions.claims?.length > 0) {
    const hasRequiredClaims = currentUser.hasAnyClaim(permissions.claims);
    if (!hasRequiredClaims) {
      return false;
    }
  }

  return true;
}
