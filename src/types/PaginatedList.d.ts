export type PaginatedListData<T> = {
  totalCount: number;
  result: T[];
  pageIndex?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
};
export type PaginatedListQuery = {
  pageIndex: number;
  pageSize: number;
  keyword?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  query?: {
    [x: string]: any;
  };
};
