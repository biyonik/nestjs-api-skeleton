export class Guard {
  public static againstNullOrUndefined(value: any, name: string): void {
    if (value === null || value === undefined) {
      throw new Error(`${name} cannot be null or undefined`);
    }
  }

  public static againstEmptyString(value: string, name: string): void {
    if (!value || value.trim().length === 0) {
      throw new Error(`${name} cannot be empty`);
    }
  }
}
