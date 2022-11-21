import type { TableProps } from '@mui/material/Table';
import type { TableBodyProps } from '@mui/material/TableBody';
import type { TableCellProps } from '@mui/material/TableCell';
import type { TableContainerProps } from '@mui/material/TableContainer';
import type { TableHeadProps } from '@mui/material/TableHead';
import type { TableRowProps } from '@mui/material/TableRow';
import React from 'react';

export type TSortDirect = 'ASC' | 'DESC';
export type TSortState = {
  sortBy: string;
  sortDirection: TSortDirect;
};

export interface ICommonTableConfig<T extends Record<string, any>> {
  field?: keyof T | string;
  headCell: string | React.ReactNode | JSX.Element | React.FC<any>;
  headCellProps?: TableCellProps;
  bodyCell?: string | React.ReactNode | JSX.Element | React.FC<any>;
  bodyCellProps?: TableCellProps | ((row: T) => TableCellProps);
  isHide?: boolean;
  resized?: boolean;
  sortState?: TSortState;
}

export interface ICommonTableProps<T extends Record<string, any>> {
  containerProps?: TableContainerProps;
  tableProps?: TableProps;
  tableHeadProps?: TableHeadProps;
  tableHeadRowProps?: TableRowProps;
  tableBodyProps?: TableBodyProps;
  tableBodyRowProps?: TableRowProps | ((row: T) => TableRowProps);
  config: ICommonTableConfig<T>[];
  rows?: T[];
  children?: React.ReactNode;
}
