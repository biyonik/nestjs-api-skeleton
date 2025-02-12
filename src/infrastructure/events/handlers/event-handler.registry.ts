import { Injectable, Type } from '@nestjs/common';
import { BaseEvent } from 'src/core/events/base/base-event';
import { IEventHandler } from 'src/core/interfaces/event-handler';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class EventHandlerRegistry {
  private readonly handlers: Map<string, Type<IEventHandler<BaseEvent>>[]> =
    new Map();

  constructor(private moduleRef: ModuleRef) {}

  registerHandler<TEvent extends BaseEvent>(
    eventType: string,
    handlerType: Type<IEventHandler<TEvent>>,
  ): void {
    const handlers = this.handlers.get(eventType) || [];
    handlers.push(handlerType as Type<IEventHandler<BaseEvent>>);
    this.handlers.set(eventType, handlers);
  }

  async getHandlers<TEvent extends BaseEvent>(
    eventType: string,
  ): Promise<IEventHandler<TEvent>[]> {
    const handlerTypes = this.handlers.get(eventType) || [];
    const handlers = await Promise.all(
      handlerTypes.map((type) => this.moduleRef.create(type)),
    );
    return handlers as IEventHandler<TEvent>[];
  }
}
