import { Entity } from '../base/entity.base';

export class Permission extends Entity<string> {
  private _name: string;
  private _description: string;

  private constructor(id: string, name: string, description: string) {
    super(id);
    this._name = name;
    this._description = description;
  }

  public static create(name: string, description: string): Permission {
    const id = crypto.randomUUID();
    return new Permission(id, name, description);
  }

  // Getters
  public get name(): string {
    return this._name;
  }
  public get description(): string {
    return this._description;
  }
}
