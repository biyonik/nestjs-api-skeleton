import { QueryHandler as NestQueryHandler } from '@nestjs/cqrs';

export function QueryHandler(query: Function): ClassDecorator {
  return (target: Function) => {
    NestQueryHandler(query)(target);
  };
}
