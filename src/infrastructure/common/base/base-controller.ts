import { CommandBus, QueryBus } from '@nestjs/cqrs';

export abstract class BaseController {
  constructor(
    protected readonly commandBus: CommandBus,
    protected readonly queryBus: QueryBus,
  ) {}

  protected async executeCommand<TResult>(command: any): Promise<TResult> {
    try {
      return await this.commandBus.execute(command);
    } catch (error) {
      // Burada error handling yapabilirsiniz
      throw error;
    }
  }

  protected async executeQuery<TResult>(query: any): Promise<TResult> {
    try {
      return await this.queryBus.execute(query);
    } catch (error) {
      // Burada error handling yapabilirsiniz
      throw error;
    }
  }
}
