import { Entity } from '../base/entity.base';

export class UserClaim extends Entity<string> {
  private _type: string;
  private _value: string;

  private constructor(id: string, type: string, value: string) {
    super(id);
    this._type = type;
    this._value = value;
  }

  public static create(type: string, value: string): UserClaim {
    const id = crypto.randomUUID();
    return new UserClaim(id, type, value);
  }

  // Getters
  public get type(): string {
    return this._type;
  }
  public get value(): string {
    return this._value;
  }
}
