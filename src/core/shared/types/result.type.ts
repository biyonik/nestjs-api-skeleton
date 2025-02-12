export class Result<T = void> {
  private constructor(
    private readonly _isSuccess: boolean,
    private readonly _error: string | null,
    private readonly _value?: T,
  ) {}

  public get isSuccess(): boolean {
    return this._isSuccess;
  }

  public get isFailure(): boolean {
    return !this._isSuccess;
  }

  public get error(): string | null {
    return this._error;
  }

  public get value(): T {
    if (!this._isSuccess) {
      throw new Error('Cannot access value of a failed result');
    }
    return this._value as T;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, null, value);
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error);
  }
}
