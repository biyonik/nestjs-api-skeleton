import { CommandHandler } from 'src/infrastructure/cqrs/decorators/command-handler.decorator';
import { AssignRoleCommand } from '../commands/assign-role.command';
import { BaseCommandHandler } from 'src/infrastructure/cqrs/base/command-handler.base';
import { IUserService } from '../../../core/interfaces/auth/user-service.interface';
import { Inject } from '@nestjs/common';
import { LoggerService } from '../../common/logging/logger.service';
import { ValidateCommand } from '../../validation/decorators/validate-command.decorator';
import { RequireRoles } from '../../../core/domain/auth/decorators/roles.decorator';

@CommandHandler(AssignRoleCommand)
export class AssignRoleCommandHandler extends BaseCommandHandler<
  AssignRoleCommand,
  void
> {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
    logger: LoggerService,
  ) {
    super(logger);
  }

  @ValidateCommand()
  @RequireRoles('SuperAdmin', 'Admin')
  protected async handle(command: AssignRoleCommand): Promise<void> {
    await this.userService.assignRole(command.userId, command.roleId);
  }
}
