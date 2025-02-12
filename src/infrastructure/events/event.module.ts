import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventBus } from './event-bus';
import { EventStore } from './event-store';
import { StoredEvent } from './stored-event.entity';
import { EventHandlerRegistry } from './handlers/event-handler.registry';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([StoredEvent])],
  providers: [EventBus, EventStore, EventHandlerRegistry],
  exports: [EventBus, EventStore, EventHandlerRegistry],
})
export class EventModule {}
