import type { TablePaginationProps } from '@mui/material/TablePagination';
export interface CommonTablePaginationProps
  extends Omit<
    TablePaginationProps,
    'onPageChange' | 'onRowsPerPageChange' | 'count' | 'size' | 'page' | 'rowsPerPage'
  > {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  onChange?: (page: number, size: number) => void;
  loading?: boolean;
}
