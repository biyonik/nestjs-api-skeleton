import { BusinessRuleException } from 'src/core/exceptions/base/business-rule.exception';
import { AggregateRoot } from '../base/aggregate-root.base';
import { Role } from './role.entity';
import { UserClaim } from './user-claim.entity';
import { UserCreatedEvent } from './events/user-created.event';
import { UserRoleAddedEvent } from './events/user-role-added.event';
import { UserClaimAddedEvent } from './events/user-claim-added.event';
import { UserDeactivatedEvent } from './events/user-deactivated.event';
import { UserActivatedEvent } from './events/user-activated.event';
import { UserPasswordChangedEvent } from './events/user-password-changed.event';

export class User extends AggregateRoot<string> {
  private _email: string;
  private _passwordHash: string;
  private _isActive: boolean;
  private _roles: Role[] = [];
  private _claims: UserClaim[] = [];

  private constructor(id: string, email: string, passwordHash: string) {
    super(id);
    this._email = email;
    this._passwordHash = passwordHash;
    this._isActive = true;
  }

  public static create(email: string, passwordHash: string): User {
    const id = crypto.randomUUID();
    const user = new User(id, email, passwordHash);
    user.addDomainEvent(new UserCreatedEvent(id, email));
    return user;
  }

  public changePassword(newPasswordHash: string): void {
    this._passwordHash = newPasswordHash;
    this.addDomainEvent(new UserPasswordChangedEvent(this.id));
  }

  public addRole(role: Role): void {
    if (this._roles.some((r) => r.id === role.id)) {
      throw new BusinessRuleException('Role already exists for user');
    }
    this._roles.push(role);
    this.addDomainEvent(new UserRoleAddedEvent(this.id, role.id));
  }

  public addClaim(claim: UserClaim): void {
    if (
      this._claims.some((c) => c.type === claim.type && c.value === claim.value)
    ) {
      throw new BusinessRuleException('Claim already exists for user');
    }
    this._claims.push(claim);
    this.addDomainEvent(
      new UserClaimAddedEvent(this.id, claim.type, claim.value),
    );
  }

  public hasRole(roleNames: string[]): boolean {
    return this._roles.some((role) => roleNames.includes(role.name));
  }

  public hasClaim(claimType: string, requiredValue?: string): boolean {
    return this._claims.some(
      (claim) =>
        claim.type === claimType &&
        (!requiredValue || claim.value === requiredValue),
    );
  }

  public hasAnyClaim(claims: Array<{ type: string; value?: string }>): boolean {
    return claims.some((claim) => this.hasClaim(claim.type, claim.value));
  }

  public deactivate(): void {
    this._isActive = false;
    this.addDomainEvent(new UserDeactivatedEvent(this.id));
  }

  public activate(): void {
    this._isActive = true;
    this.addDomainEvent(new UserActivatedEvent(this.id));
  }

  // Getters
  public get email(): string {
    return this._email;
  }
  public get passwordHash(): string {
    return this._passwordHash;
  }
  public get isActive(): boolean {
    return this._isActive;
  }
  public get roles(): Role[] {
    return [...this._roles];
  }
  public get claims(): UserClaim[] {
    return [...this._claims];
  }
}
