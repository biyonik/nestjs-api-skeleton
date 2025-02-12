import { BaseCommand } from '../commands/base.command';
import { ICommandHandler } from '@nestjs/cqrs';
import { LoggerService } from '@nestjs/common';

export abstract class BaseCommandHandler<TCommand extends BaseCommand, TResult>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  implements ICommandHandler<TCommand>
{
  constructor(protected readonly logger: LoggerService) {}

  async execute(command: any): Promise<TResult> {
    const typedCommand = command as TCommand;
    try {
      this.logger.debug(
        `Handling command ${typedCommand.constructor.name}`,
        JSON.stringify(typedCommand),
      );

      const result = await this.handle(typedCommand);

      this.logger.debug(
        `Command ${typedCommand.constructor.name} handled successfully`,
      );

      return result;
    } catch (error) {
      this.logger.error(
        `Error handling command ${typedCommand.constructor.name}`,
        error.stack,
      );
      throw error;
    }
  }

  protected abstract handle(command: TCommand): Promise<TResult>;
}
