import type { PaginationProps } from '@mui/material/Pagination';
import type { TableProps } from '@mui/material/Table';
import type { TableBodyProps } from '@mui/material/TableBody';
import type { TableCellProps } from '@mui/material/TableCell';
import type { TableContainerProps } from '@mui/material/TableContainer';
import type { TableHeadProps } from '@mui/material/TableHead';
import type { TableRowProps } from '@mui/material/TableRow';
import type { ComponentType, ReactNode } from 'react';

export type TSortDirect = 'ASC' | 'DESC';
export type TSortState = {
  sortBy: string;
  sortDirection: TSortDirect;
};

export type TBodyCellRenderFunction<T> = (args: TableCellProps & { row: T }) => ReactNode;
export type TBodyCellInnerRenderFunction<T> = (args: { row: T }) => ReactNode;
export type TBodyCellComponent<T> = ComponentType<TableCellProps & { row: T }>;

export interface ICommonTableConfig<T extends Record<string, any>> {
  _key: string;
  /**
   * name of field which used to map value in table cell if custom render functions are not defined
   */
  field?: keyof T | string;
  /**
   * render function of head cell
   */
  headCell: ReactNode | ComponentType<TableCellProps>;
  /**
   * props of Head cell
   */
  headCellProps?: TableCellProps;
  /**
   * custom render of body cell
   */
  bodyCell?: ReactNode | TBodyCellComponent<T> | TBodyCellRenderFunction<T>;
  /**
   * custom render of body inner HTML
   */
  bodyCellInner?: ReactNode | TBodyCellInnerRenderFunction<T>;
  /**
   * props of body cell
   */
  bodyCellProps?: TableCellProps | ((row: T) => TableCellProps);
  /**
   * show/hide column
   */
  isHide?: boolean;
  /**
   * @deprecated
   */
  resized?: boolean;
  /**
   * sort config by column
   */
  sortState?: TSortState;
}

export type TSelectTable<T> = {
  isCheckAll?: boolean;
  onCheckAll?: (checked: boolean) => void;
  isRowSelected?: (row: T) => boolean;
  onCheckRow?: (row: T) => void;
};

export interface ICommonTableProps<T extends Record<string, any>> {
  containerProps?: TableContainerProps;
  tableProps?: TableProps;
  tableHeadProps?: TableHeadProps;
  tableHeadRowProps?: TableRowProps;
  tableBodyProps?: TableBodyProps;
  tableBodyRowProps?: TableRowProps | ((row: T) => TableRowProps);
  config: ICommonTableConfig<T>[];
  rows?: T[];
  children?: ReactNode;
  selectable?: TSelectTable<T>;
}

export interface ICommonPaginationProps extends Omit<PaginationProps, 'onChange' | 'count' | 'size'> {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  onChange?: (page: number) => void;
}
