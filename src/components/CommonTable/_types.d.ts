import type { TAny } from '@/_types/TAny';
import type { TMuiIcon, TMuiIconProps } from '@/_types/TMuiIcon';
import type { TNavLinkProps } from '@/_types/TNavLinkProps';
import type { ListItemIconProps } from '@mui/material/ListItemIcon';
import type { MenuProps } from '@mui/material/Menu/Menu';
import type { MenuItemProps } from '@mui/material/MenuItem';
import type { PaginationProps } from '@mui/material/Pagination';
import type { TableProps } from '@mui/material/Table';
import type { TableBodyProps } from '@mui/material/TableBody';
import type { TableCellProps } from '@mui/material/TableCell';
import type { TableContainerProps } from '@mui/material/TableContainer';
import type { TableHeadProps } from '@mui/material/TableHead';
import type { TablePaginationProps } from '@mui/material/TablePagination';
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
  /**
   * a unique GUID string
   */
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
  /**
   * display column as sticky at the left-end
   */
  stickyFirst?: boolean;
  /**
   * display column as sticky at the right-end
   */
  stickyLast?: boolean;
}
export type TSelectTable<T extends TAny> = {
  /**
   * checked status of whole page data
   * - `true`: whole page data are checked
   * - `false`: whole page data are un-checked
   */
  isCheckAll?: boolean;
  /**
   * callback to check/uncheck on whole page data
   */
  onCheckAll?: (checked: boolean) => void;
  /**
   * selector callback to get checked status of one row
   */
  isRowSelected?: (row: T) => boolean;
  /**
   * callback to check/uncheck on one row
   */
  onCheckRow?: (row: T) => void;
};
export interface ICommonTableProps<T extends TAny> {
  /**
   * Props of the `TableContainer` component.
   */
  containerProps?: TableContainerProps;
  /**
   * Props of the `Table` component.
   */
  tableProps?: TableProps;
  /**
   * Props of the `Table > TableHead` component.
   */
  tableHeadProps?: TableHeadProps;
  /**
   * Props of the `Table > TableHead > TableRow` component.
   */
  tableHeadRowProps?: TableRowProps;
  /**
   * Props of the `Table > TableBody` component.
   */
  tableBodyProps?: TableBodyProps;
  /**
   * Props of the `Table > TableBody > TableRow` components.
   * You can define props for all table rows or specified props for each row.
   */
  tableBodyRowProps?: TableRowProps | ((row: T) => TableRowProps);
  /**
   * the configuration for columns
   */
  columns: ICommonTableConfig<T>[];
  /**
   * the array of data
   */
  rows?: T[];
  /**
   * Display a loading progress bar or not
   */
  loading?: boolean;
  /**
   * Display text or some ui in the blank row when loading
   */
  loadingText?: ReactNode;
  /**
   * Display text or some ui in the blank row when there're no data
   */
  notFoundText?: ReactNode;
  /**
   * Type of display sticky columns
   * - `true`: all sticky columns come overlap
   * - `false` | `undefined`: sticky columns keep their position
   */
  columnStickyAsStack?: boolean;
  /**
   * the select box configuration
   */
  selectable?: TSelectTable<T>;
  /**
   * display the detail panel toggle by specified condition
   */
  visibilityDetailPanelToggle?: (row: T, RowIndex: number) => boolean;
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
  /**
   * a unique GUID string
   */
  key: string;
  /**
   * the label
   */
  label?: ReactNode;
  /**
   * callback to handle click on item
   */
  onClick?: (item?: T, event?: MouseEvent<HTMLAnchorElement>, ...others: any[]) => void;
  /**
   * the `to` props.
   * if this props are defined, the item will rendered as a `NavLink` component
   */
  to?: string;
  /**
   * the other props of `NavLink` component and
   * only work inscase the `to` props are defined
   */
  linkProps?: TNavLinkProps;
  /**
   * the icon component, use component import from `@mui/icons-material` or `SvgIcon`
   * or some google font like `<span class="material-symbols-rounded">arrow_back</span>` which can find at `https://fonts.google.com/icons`
   * It will be rendered as `MenuItem > ListItemIcon > icon`
   */
  icon?: TMuiIcon;
  /**
   * the props of the icon component
   */
  iconProps?: TMuiIconProps;
  /**
   * the props of the `MenuItem > ListItemIcon` component
   * only work inscase the `icon` props are defined
   */
  iconWrapProps?: ListItemIconProps;
  /**
   * the props of the `MenuItem` component
   */
  props?: Omit<MenuItemProps, 'children'>;
  /**
   * hide or display
   */
  isHide?: boolean;
  type: 'item' | 'divider';
  /**
   * custom render of the `MenuItem` component
   */
  render?: TItemMenuActionRenderFunction<T, TAny> | TItemMenuActionComponent<T, TAny>;
};
//#endregion

//#region Table extensions
export type TDetailPanelComponent<T extends TAny> = TBodyCellInnerComponent<T, { closePanel?: () => void }>;
export type TDetailPanelToggle<T extends TAny> = React.ComponentType<{
  open: boolean;
  toggle: (event: any, position?: 'top' | 'bottom') => void;
  row: T;
  rowIndex?: number;
}>;

//#endregion
