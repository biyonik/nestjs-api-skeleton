import { IQueryHandler } from '@nestjs/cqrs';
import { BaseQuery } from '../queries/base.query';
import { LoggerService } from '../../common/logging/logger.service';

export abstract class BaseQueryHandler<TQuery extends BaseQuery, TResult>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  implements IQueryHandler<TQuery>
{
  constructor(protected readonly logger: LoggerService) {}

  async execute(query: TQuery): Promise<TResult> {
    try {
      this.logger.debug(
        `Handling query ${query.constructor.name}`,
        JSON.stringify(query),
      );

      const result = await this.handle(query);

      this.logger.debug(`Query ${query.constructor.name} handled successfully`);

      return result;
    } catch (error) {
      this.logger.error(
        `Error handling query ${query.constructor.name}`,
        error.stack,
      );
      throw error;
    }
  }

  protected abstract handle(query: TQuery): Promise<TResult>;
}
