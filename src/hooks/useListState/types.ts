export type TPagingState = {
  pageIndex: number;
  pageSize: number;
};

export type TPaginStateNullable = {
  pageIndex?: number;
  pageSize?: number;
};

export type TSortDirect = 'ASC' | 'DESC';

export type TSortState = {
  sortBy: string;
  sortDirection: TSortDirect;
};

export type TSortStateNullable = {
  sortBy?: string;
  sortDirection?: TSortDirect;
};

export type TQueryExtendParams = {
  [x: string]: any;
};

export type TListState = { totalCount: number; moreFilter: TQueryExtendParams } & TPagingState & TSortStateNullable;
