import { BaseCommand } from 'src/infrastructure/cqrs/commands/base.command';

export class RegisterCommand extends BaseCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly name: string,
  ) {
    super();
  }
}
