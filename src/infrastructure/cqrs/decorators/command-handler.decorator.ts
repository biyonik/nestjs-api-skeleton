import { CommandHandler as NestCommandHandler } from '@nestjs/cqrs';

export function CommandHandler(command: Function): ClassDecorator {
  return (target: Function) => {
    NestCommandHandler(command)(target);
  };
}
