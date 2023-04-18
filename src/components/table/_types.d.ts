import type { AnyObject, MuiIcon, MuiIconProps, NavLinkProps } from '@/types';
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
export type SortDirect = 'ASC' | 'DESC';
export type SortState = {
  sortBy: string;
  sortDirection: SortDirect;
};
export type BodyCellInnerRenderFunctionArgs<RowData extends AnyObject, CellComponentProps extends AnyObject = AnyObject> = {
  row: RowData;
  rowIndex?: number;
} & CellComponentProps;
export type BodyCellRenderFunctionArgs<RowData extends AnyObject, CellComponentProps extends AnyObject = AnyObject> = TableCellProps &
  BodyCellInnerRenderFunctionArgs<RowData, CellComponentProps>;
export type BodyCellRenderFunction<RowData extends AnyObject, CellComponentProps extends AnyObject = AnyObject> = (
  args: BodyCellRenderFunctionArgs<RowData, CellComponentProps>
) => ReactNode;
export type BodyCellInnerRenderFunction<RowData extends AnyObject, CellComponentProps extends AnyObject = AnyObject> = (
  args: BodyCellInnerRenderFunctionArgs<RowData, CellComponentProps>
) => ReactNode;
export type BodyCellComponentProps<RowData extends AnyObject, CellComponentProps extends AnyObject = AnyObject> = BodyCellRenderFunctionArgs<RowData, CellComponentProps>
export type BodyCellComponent<RowData extends AnyObject, CellComponentProps extends AnyObject = AnyObject> = ComponentType<
  BodyCellRenderFunctionArgs<RowData, CellComponentProps>
>;
export type BodyCellInnerComponentProps<RowData extends AnyObject, CellComponentProps extends AnyObject = AnyObject> = BodyCellInnerRenderFunctionArgs<RowData, CellComponentProps>
export type BodyCellInnerComponent<RowData extends AnyObject, CellComponentProps extends AnyObject = AnyObject> = ComponentType<
  BodyCellInnerRenderFunctionArgs<RowData, CellComponentProps>
>;
export type CommonTableConfig<RowData extends AnyObject> = {
  /**
   * a unique GUID string
   */
  _key: string;
  /**
   * name of field which used to map value in table cell if custom render functions are not defined
   */
  field?: keyof RowData | 'action';
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
  bodyCell?: ReactNode | BodyCellComponent<RowData> | BodyCellRenderFunction<RowData>;
  /**
   * custom render of body inner HTML
   */
  bodyCellInner?: ReactNode | BodyCellInnerRenderFunction<RowData, any>;
  /**
   * props of body cell
   */
  bodyCellProps?: TableCellProps | ((row: RowData, rowIndex?: number) => TableCellProps);
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
  sortState?: SortState;
  /**
   * display column as sticky at the left-end
   */
  stickyFirst?: boolean;
  /**
   * display column as sticky at the right-end
   */
  stickyLast?: boolean;
}
export type Selectability<RowData extends AnyObject> = {
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
  isRowSelected?: (row: RowData) => boolean;
  /**
   * callback to check/uncheck on one row
   */
  onCheckRow?: (row: RowData) => void;
};
export interface CommonTableProps<RowData extends AnyObject> {
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
  tableBodyRowProps?: TableRowProps | ((row: RowData) => TableRowProps);
  /**
   * the configuration for columns
   */
  columns: CommonTableConfig<RowData>[];
  /**
   * the array of data
   */
  rows?: RowData[];
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
  selectability?: Selectability<RowData>;
  /**
   * display the detail panel toggle by specified condition
   */
  visibilityDetailPanelToggle?: (row: RowData, RowIndex: number) => boolean;
}
export interface CommonPaginationProps extends Omit<PaginationProps, 'onChange' | 'count' | 'size'> {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  onChange?: (page: number) => void;
  loading?: boolean;
}
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
//#endregion
//#region Menu Action
export type ItemMenuActionRenderArgs<RowData extends AnyObject, OtherProps extends AnyObject> = {
  key: string | number;
  row?: RowData;
  icon: () => ReactNode;
  label: () => ReactNode;
  props: Omit<MenuProps, 'children'>;
} & OtherProps;
export type ItemMenuActionComponent<RowData extends AnyObject, OtherProps extends AnyObject = AnyObject> = ComponentType<
  ItemMenuActionRenderArgs<RowData, OtherProps>
>;
export type ItemMenuActionRenderFunction<RowData extends AnyObject, ComponentOtherProps extends AnyObject> = (
  args: ItemMenuActionRenderArgs<RowData, ComponentOtherProps>
) => ReactNode;
export type ItemMenuActionConfig<RowData extends AnyObject> = {
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
  onClick?: (item?: RowData, event?: MouseEvent<HTMLAnchorElement>, ...others: any[]) => void;
  /**
   * the `to` props.
   * if this props are defined, the item will rendered as a `NavLink` component
   */
  to?: string;
  /**
   * the other props of `NavLink` component and
   * only work inscase the `to` props are defined
   */
  linkProps?: NavLinkProps;
  /**
   * the icon component, use component import from `@mui/icons-material` or `SvgIcon`
   * or some google font like `<span class="material-symbols-rounded">arrow_back</span>` which can find at `https://fonts.google.com/icons`
   * It will be rendered as `MenuItem > ListItemIcon > icon`
   */
  icon?: MuiIcon;
  /**
   * the props of the icon component
   */
  iconProps?: MuiIconProps;
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
  render?: ItemMenuActionRenderFunction<RowData, AnyObject> | ItemMenuActionComponent<RowData, AnyObject>;
};
//#endregion
//#region Table extensions
export type DetailPanelComponent<RowData extends AnyObject> = BodyCellInnerComponent<RowData, { closePanel?: () => void }>;
export type DetailPanelToggleComponent<RowData extends AnyObject> = ComponentType<{
  open: boolean;
  toggle: (event: any, position?: 'top' | 'bottom') => void;
  row: RowData;
  rowIndex?: number;
}>;
//#endregion
