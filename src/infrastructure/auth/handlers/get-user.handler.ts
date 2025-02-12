import { GetUserQuery } from '../queries/get-user.query';
import { BaseQueryHandler } from 'src/infrastructure/cqrs/base/query-handler.base';
import { Inject } from '@nestjs/common';
import { IUserService } from 'src/core/interfaces/auth/user-service.interface';
import { LoggerService } from 'src/infrastructure/common/logging/logger.service';
import { ValidateQuery } from 'src/infrastructure/validation/decorators/validate-query.decorator';
import { NotFoundException } from 'src/core/exceptions/base/not-found.exception';
import { UserDto } from '../dto/user.dto';
import { QueryHandler } from 'src/infrastructure/cqrs/decorators/query-handler.decorator';

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler extends BaseQueryHandler<
  GetUserQuery,
  UserDto
> {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
    logger: LoggerService,
  ) {
    super(logger);
  }

  @ValidateQuery()
  protected async handle(query: GetUserQuery): Promise<UserDto> {
    const user = await this.userService.getCurrentUser(query.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      isActive: user.isActive,
    };
  }
}
