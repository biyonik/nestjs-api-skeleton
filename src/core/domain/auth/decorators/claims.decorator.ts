import { RequirePermissions } from './require-permissions.decorator';

export function RequireClaims(
  ...claims: Array<{ type: string; value?: string }>
) {
  return RequirePermissions({ claims });
}
