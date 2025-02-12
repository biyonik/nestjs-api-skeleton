import { QueryHandler } from 'src/infrastructure/cqrs/decorators/query-handler.decorator';
import { GetUserRolesQuery } from '../queries/get-user-roles.query';
import { BaseQueryHandler } from 'src/infrastructure/cqrs/base/query-handler.base';
import { Inject } from '@nestjs/common';
import { IUserService } from '../../../core/interfaces/auth/user-service.interface';
import { ValidateQuery } from '../../validation/decorators/validate-query.decorator';
import { LoggerService } from 'src/infrastructure/common/logging/logger.service';
import { NotFoundException } from 'src/core/exceptions/base/not-found.exception';
import { RoleDto } from '../dto/role.dto';

@QueryHandler(GetUserRolesQuery)
export class GetUserRolesQueryHandler extends BaseQueryHandler<
  GetUserRolesQuery,
  RoleDto[]
> {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
    logger: LoggerService,
  ) {
    super(logger);
  }

  @ValidateQuery()
  protected async handle(query: GetUserRolesQuery): Promise<RoleDto[]> {
    const user = await this.userService.getCurrentUser(query.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.roles.map((role) => ({
      id: role.id,
      name: role.name,
      description: role.description,
    }));
  }
}
