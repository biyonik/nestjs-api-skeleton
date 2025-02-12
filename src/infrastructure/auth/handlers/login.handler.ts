import { LoginCommand } from '../commands/login.command';
import { BaseCommandHandler } from 'src/infrastructure/cqrs/base/command-handler.base';
import { Inject } from '@nestjs/common';
import { IUserService } from 'src/core/interfaces/auth/user-service.interface';
import { IPasswordHasher } from '../../../core/interfaces/auth/password-hasher.interface';
import { IJwtService } from '../../../core/interfaces/auth/jwt-service.interface';
import { LoggerService } from '../../common/logging/logger.service';
import { ValidateCommand } from '../../validation/decorators/validate-command.decorator';
import { UnauthorizedException } from '../../../core/exceptions/base/unauthorized.exception';
import { CommandHandler } from 'src/infrastructure/cqrs/decorators/command-handler.decorator';

@CommandHandler(LoginCommand)
export class LoginCommandHandler extends BaseCommandHandler<
  LoginCommand,
  { accessToken: string }
> {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
    @Inject('IPasswordHasher')
    private readonly passwordHasher: IPasswordHasher,
    @Inject('IJwtService')
    private readonly jwtService: IJwtService,
    logger: LoggerService,
  ) {
    super(logger);
  }

  @ValidateCommand()
  protected async handle(
    command: LoginCommand,
  ): Promise<{ accessToken: string }> {
    const user = await this.userService.findByEmail(command.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.passwordHasher.verify(
      command.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('User is not active');
    }

    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return { accessToken };
  }
}
