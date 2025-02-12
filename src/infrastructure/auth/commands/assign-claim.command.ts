import { BaseCommand } from 'src/infrastructure/cqrs/commands/base.command';

export class AssignClaimCommand extends BaseCommand {
  constructor(
    public readonly userId: string,
    public readonly claimType: string,
    public readonly claimValue: string,
  ) {
    super();
  }
}
