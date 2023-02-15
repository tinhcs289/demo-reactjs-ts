export type TListDataModel<T> = {
  totalCount: number;
  result: T[];
  pageIndex?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
};

export type TListDataQueryModel = {
  pageIndex: number;
  pageSize: number;
  keyword?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  query?: {
    [x: string]: any;
  };
};
