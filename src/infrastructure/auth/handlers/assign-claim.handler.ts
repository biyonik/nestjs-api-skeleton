import { CommandHandler } from 'src/infrastructure/cqrs/decorators/command-handler.decorator';
import { AssignClaimCommand } from '../commands/assign-claim.command';
import { BaseCommandHandler } from '../../cqrs/base/command-handler.base';
import { Inject } from '@nestjs/common';
import { IUserService } from '../../../core/interfaces/auth/user-service.interface';
import { LoggerService } from '../../common/logging/logger.service';
import { ValidateCommand } from '../../validation/decorators/validate-command.decorator';
import { RequireRoles } from '../../../core/domain/auth/decorators/roles.decorator';

@CommandHandler(AssignClaimCommand)
export class AssignClaimCommandHandler extends BaseCommandHandler<
  AssignClaimCommand,
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
  protected async handle(command: AssignClaimCommand): Promise<void> {
    await this.userService.assignClaim(
      command.userId,
      command.claimType,
      command.claimValue,
    );
  }
}
