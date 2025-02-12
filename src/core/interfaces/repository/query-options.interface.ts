export interface IQueryOptions<T> {
  include?: string[];
  orderBy?: {
    property: keyof T;
    direction: 'ASC' | 'DESC';
  }[];
  skip?: number;
  take?: number;
}
