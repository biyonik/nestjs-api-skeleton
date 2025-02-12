import { BaseCommand } from 'src/infrastructure/cqrs/commands/base.command';

export class AssignRoleCommand extends BaseCommand {
  constructor(
    public readonly userId: string,
    public readonly roleId: string,
  ) {
    super();
  }
}
