export class Assert {
  public static notEmpty(value: string, message: string): void {
    if (!value || value.trim().length === 0) {
      throw new Error(message);
    }
  }

  public static notNull<T>(
    value: T | null | undefined,
    message: string,
  ): asserts value is T {
    if (value === null || value === undefined) {
      throw new Error(message);
    }
  }

  public static isTrue(condition: boolean, message: string): void {
    if (!condition) {
      throw new Error(message);
    }
  }

  public static inRange(
    value: number,
    min: number,
    max: number,
    message: string,
  ): void {
    if (value < min || value > max) {
      throw new Error(message);
    }
  }
}
