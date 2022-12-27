import type { TAny } from '@/_types/TAny';
import type { TMuiIcon, TMuiIconProps } from '@/_types/TMuiIcon';
import type { TNavLinkProps } from '@/_types/TNavLinkProps';
import type { MenuProps } from '@mui/material/Menu/Menu';
import type { PaginationProps } from '@mui/material/Pagination';
import type { TablePaginationProps } from '@mui/material/TablePagination';
import type { TableProps } from '@mui/material/Table';
import type { TableBodyProps } from '@mui/material/TableBody';
import type { TableCellProps } from '@mui/material/TableCell';
import type { TableContainerProps } from '@mui/material/TableContainer';
import type { TableHeadProps } from '@mui/material/TableHead';
import type { TableRowProps } from '@mui/material/TableRow';
import type { ComponentType, MouseEvent, ReactNode } from 'react';

//#region Table
export type TSortDirect = 'ASC' | 'DESC';
export type TSortState = {
  sortBy: string;
  sortDirection: TSortDirect;
};
export type TBodyCellInnerRenderFunctionArgs<T extends TAny, U extends TAny> = { row: T; rowIndex?: number } & U;
export type TBodyCellRenderFunctionArgs<T extends TAny, U extends TAny> = TableCellProps &
  TBodyCellInnerRenderFunctionArgs<T, U>;
export type TBodyCellRenderFunction<T extends TAny, U extends TAny> = (
  args: TBodyCellRenderFunctionArgs<T, U>,
) => ReactNode;
export type TBodyCellInnerRenderFunction<T extends TAny, U extends TAny> = (
  args: TBodyCellInnerRenderFunctionArgs<T, U>,
) => ReactNode;
export type TBodyCellComponent<T extends TAny, U extends TAny> = ComponentType<TBodyCellRenderFunctionArgs<T, U>>;
export type TBodyCellInnerComponent<T extends TAny, U extends TAny> = ComponentType<
  TBodyCellInnerRenderFunctionArgs<T, U>
>;
export interface ICommonTableConfig<T extends TAny> {
  _key: string;
  /**
   * name of field which used to map value in table cell if custom render functions are not defined
   */
  field?: keyof T | 'action';
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
  bodyCellInner?: ReactNode | TBodyCellInnerRenderFunction<T, any>;
  /**
   * props of body cell
   */
  bodyCellProps?: TableCellProps | ((row: T, rowIndex?: number) => TableCellProps);
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
  stickyFirst?: boolean;
  stickyLast?: boolean;
}
export type TSelectTable<T extends TAny> = {
  isCheckAll?: boolean;
  onCheckAll?: (checked: boolean) => void;
  isRowSelected?: (row: T) => boolean;
  onCheckRow?: (row: T) => void;
};
export interface ICommonTableProps<T extends TAny> {
  containerProps?: TableContainerProps;
  tableProps?: TableProps;
  tableHeadProps?: TableHeadProps;
  tableHeadRowProps?: TableRowProps;
  tableBodyProps?: TableBodyProps;
  tableBodyRowProps?: TableRowProps | ((row: T) => TableRowProps);
  columns: ICommonTableConfig<T>[];
  rows?: T[];
  children?: ReactNode;
  selectable?: TSelectTable<T>;
  loading?: boolean;
  loadingText?: ReactNode;
  notFoundText?: ReactNode;
}
export interface ICommonPaginationProps extends Omit<PaginationProps, 'onChange' | 'count' | 'size'> {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  onChange?: (page: number) => void;
}

export interface ICommonTablePaginationProps
  extends Omit<
    TablePaginationProps,
    'onPageChange' | 'onRowsPerPageChange' | 'count' | 'size' | 'page' | 'rowsPerPage'
  > {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  onChange?: (page: number, size: number) => void;
}
//#endregion

//#region Menu Action
export type TItemMenuActionRenderArgs<T extends TAny, U extends TAny> = {
  key: string | number;
  row?: T;
  icon: () => ReactNode;
  label: () => ReactNode;
  props: Omit<MenuProps, 'children'>;
} & U;
export type TItemMenuActionComponent<T extends TAny, U extends TAny> = ComponentType<TItemMenuActionRenderArgs<T, U>>;
export type TItemMenuActionRenderFunction<T extends TAny, U extends TAny> = (
  args: TItemMenuActionRenderArgs<T, U>,
) => ReactNode;
export type TItemMenuAction<T extends TAny> = {
  key: string;
  label?: ReactNode;
  onClick?: (item?: T, event?: MouseEvent<HTMLAnchorElement>, ...others: any[]) => void;
  to?: string;
  linkProps?: TNavLinkProps;
  icon?: TMuiIcon;
  iconWrapProps?: ListItemIconProps;
  iconProps?: TMuiIconProps;
  props?: Omit<MenuProps, 'children'>;
  isHide?: boolean;
  type: 'item' | 'divider';
  render?: TItemMenuActionRenderFunction<T, TAny> | TItemMenuActionComponent<T, TAny>;
};
//#endregion
