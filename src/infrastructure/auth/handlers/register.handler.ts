import { CommandHandler } from 'src/infrastructure/cqrs/decorators/command-handler.decorator';
import { RegisterCommand } from '../commands/register.command';
import { BaseCommandHandler } from 'src/infrastructure/cqrs/base/command-handler.base';
import { IUserService } from '../../../core/interfaces/auth/user-service.interface';
import { Inject } from '@nestjs/common';
import { LoggerService } from '../../common/logging/logger.service';
import { ValidateCommand } from '../../validation/decorators/validate-command.decorator';

@CommandHandler(RegisterCommand)
export class RegisterCommandHandler extends BaseCommandHandler<
  RegisterCommand,
  string
> {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
    logger: LoggerService,
  ) {
    super(logger);
  }

  @ValidateCommand()
  protected async handle(command: RegisterCommand): Promise<string> {
    return this.userService.createUser(command.email, command.password);
  }
}
