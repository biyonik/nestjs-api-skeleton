import { Entity } from '../base/entity.base';
import { Permission } from './permission.entity';
import { BusinessRuleException } from '../../exceptions/base/business-rule.exception';

export class Role extends Entity<string> {
  private _name: string;
  private _description: string;
  private _permissions: Permission[] = [];

  private constructor(id: string, name: string, description: string) {
    super(id);
    this._name = name;
    this._description = description;
  }

  public static create(name: string, description: string): Role {
    const id = crypto.randomUUID();
    return new Role(id, name, description);
  }

  public addPermission(permission: Permission): void {
    if (this._permissions.some((p) => p.id === permission.id)) {
      throw new BusinessRuleException('Permission already exists in role');
    }
    this._permissions.push(permission);
  }

  public hasPermission(permissionName: string): boolean {
    return this._permissions.some((p) => p.name === permissionName);
  }

  // Getters
  public get name(): string {
    return this._name;
  }
  public get description(): string {
    return this._description;
  }
  public get permissions(): Permission[] {
    return [...this._permissions];
  }
}
