import { ValidationError } from 'class-validator';

export function formatErrors(
  errors: ValidationError[],
): Record<string, string[]> {
  return errors.reduce(
    (acc, error) => {
      acc[error.property] = Object.values(error.constraints || {});
      return acc;
    },
    {} as Record<string, string[]>,
  );
}
