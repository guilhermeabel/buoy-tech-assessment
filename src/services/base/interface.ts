export type PaginatedResult<T> = {
  list: T[];
  nextCursor?: string;
  prevCursor?: string;
};

export type ElementIdType = string | number | undefined;
