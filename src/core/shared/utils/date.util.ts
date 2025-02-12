export class DateUtil {
  public static toISOString(date: Date): string {
    return date.toISOString();
  }

  public static format(date: Date, format: string): string {
    // Implementation with date-fns or similar
    return date.toLocaleDateString();
  }

  public static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  public static isValid(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }
}
