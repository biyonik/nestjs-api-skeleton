export interface ValidationMiddleware {
  validate(schema: any): Promise<void>;
}
