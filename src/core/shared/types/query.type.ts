import { SortDirection } from 'src/core/common/enums/sort-direction.enum';

export interface QueryOptions {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: SortDirection;
  filter?: Record<string, any>;
  includes?: string[];
}
