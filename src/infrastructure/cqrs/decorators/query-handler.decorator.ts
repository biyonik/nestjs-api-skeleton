import { Type } from '@nestjs/common';
import { IQuery } from '@nestjs/cqrs';
import { QueryHandler as NestQueryHandler } from '@nestjs/cqrs';

export function QueryHandler(query: Type<IQuery>): ClassDecorator {
  return (target: any) => {
    NestQueryHandler(query)(target);
  };
}
