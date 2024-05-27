import type { ListOrder } from '../constants/app';

export type Nullable<T = void> = T | null | undefined;

export type WithEmptyString<T = void> = T | '';

export interface QueryPagination {
  limit: number;
  page: number;
  order: ListOrder;
}

export interface QueryList<T> extends QueryPagination {
  sort: T;
}
