import { BaseCommand } from 'src/infrastructure/cqrs/commands/base.command';

export class LoginCommand extends BaseCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {
    super();
  }
}
