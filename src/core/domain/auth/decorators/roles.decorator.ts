import { RequirePermissions } from './require-permissions.decorator';

export function RequireRoles(...roles: string[]) {
  return RequirePermissions({ roles });
}
