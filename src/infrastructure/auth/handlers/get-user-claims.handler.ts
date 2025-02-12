import { QueryHandler } from 'src/infrastructure/cqrs/decorators/query-handler.decorator';
import { GetUserClaimsQuery } from '../queries/get-user-claims.query';
import { BaseQueryHandler } from '../../cqrs/base/query-handler.base';
import { Inject } from '@nestjs/common';
import { IUserService } from 'src/core/interfaces/auth/user-service.interface';
import { LoggerService } from '../../common/logging/logger.service';
import { ValidateQuery } from '../../validation/decorators/validate-query.decorator';
import { NotFoundException } from 'src/core/exceptions/base/not-found.exception';
import { UserClaimDto } from '../dto/user-claim.dto';

@QueryHandler(GetUserClaimsQuery)
export class GetUserClaimsQueryHandler extends BaseQueryHandler<
  GetUserClaimsQuery,
  UserClaimDto[]
> {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
    logger: LoggerService,
  ) {
    super(logger);
  }

  @ValidateQuery()
  protected async handle(query: GetUserClaimsQuery): Promise<UserClaimDto[]> {
    const user = await this.userService.getCurrentUser(query.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.claims.map((claim) => ({
      id: claim.id,
      type: claim.type,
      value: claim.value,
    }));
  }
}
