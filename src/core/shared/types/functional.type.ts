export type Optional<T> = T | undefined;
export type Nullable<T> = T | null;
export type Either<L, R> =
  | { left: L; right?: never }
  | { left?: never; right: R };
export type Try<T> = Either<Error, T>;
