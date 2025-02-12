import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stored_events')
export class StoredEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  eventType: string;

  @Column('text')
  eventBody: string;

  @Column()
  aggregateId: string;

  @Column()
  version: number;

  @Column('timestamp')
  occurredOn: Date;

  constructor(partial: Partial<StoredEvent>) {
    Object.assign(this, partial);
  }
}
