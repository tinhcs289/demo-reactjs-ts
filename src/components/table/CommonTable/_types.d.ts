import type { AnyObject } from '@/types';
import type { TableProps } from '@mui/material/Table';
import type { TableBodyProps } from '@mui/material/TableBody';
import type { TableCellProps } from '@mui/material/TableCell';
import type { TableContainerProps } from '@mui/material/TableContainer';
import type { TableHeadProps } from '@mui/material/TableHead';
import type { TableRowProps } from '@mui/material/TableRow';
import type { ComponentType, ReactNode } from 'react';
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
export type CommonTableConfig<RowData extends AnyObject = AnyObject> = {
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
export type Selectability<RowData extends AnyObject = AnyObject> = {
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
export type BodyRowProps<RowData extends AnyObject = AnyObject> = TableRowProps<"tr", {}> & {
  id: string;
  rowId: string;
  row: RowData;
  rowIndex: number;
  totalOfCells: number;
  columns: CommonTableConfig<RowData>[];
}
export type BodyRowComponent<RowData extends AnyObject = AnyObject> = ComponentType<BodyRowProps<RowData>>;
export type BodyRowHoc<RowData extends AnyObject = AnyObject> = (WrappedComponent: BodyRowComponent<RowData>) => BodyRowComponent<RowData>;
export interface CommonTableProps<RowData extends AnyObject = AnyObject> {
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
   * The array of HOC for wrapping the `TableRow` component.
   * Pass this prop for extending or customizing `TableRow` component.
   */
  rowHocs?: BodyRowHoc<RowData>[];
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
   * The name of the attribute corresponding to the identifier of each record in the table.
   * Default as `id`
   */
  idField?: string;
  virtualized?: boolean;
  rowHeight?: number;
}
//#endregion
//#region Table extensions
export type DetailPanelComponent<RowData extends AnyObject = AnyObject> = BodyCellInnerComponent<RowData, { closePanel?: () => void }>;
export type DetailPanelToggleComponent<RowData extends AnyObject = AnyObject> = ComponentType<{
  open: boolean;
  toggle: (event: any, position?: 'top' | 'bottom') => void;
  row: RowData;
  rowIndex?: number;
}>;
//#endregion
