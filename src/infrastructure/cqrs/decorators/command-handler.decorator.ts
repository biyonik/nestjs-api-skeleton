import { Type } from '@nestjs/common';
import { ICommand } from '@nestjs/cqrs';
import { CommandHandler as NestCommandHandler } from '@nestjs/cqrs';

export function CommandHandler(command: Type<ICommand>): ClassDecorator {
  return (target: any) => {
    NestCommandHandler(command)(target);
  };
}
