export interface IJwtService {
  sign(payload: Record<string, any>): string;
  verify<T extends Record<string, any>>(token: string): T;
  decode<T extends Record<string, any>>(token: string): T | null;
}
