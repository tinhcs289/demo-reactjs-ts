import type { PaginationProps } from '@mui/material/Pagination';
export interface CommonPaginationProps extends Omit<PaginationProps, 'onChange' | 'count'> {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  onChange?: (page: number) => void;
  loading?: boolean;
}
