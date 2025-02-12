export interface IEventMetadata {
  readonly userId?: string;
  readonly timestamp: Date;
  readonly correlationId?: string;
  readonly causationId?: string;
  readonly ip?: string;
}
