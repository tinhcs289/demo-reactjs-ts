import render from '@/helpers/reactHelpers/render';
import type { SxProps, Theme } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import type { ICommonTableConfig } from './_types';

const stickyFirstSx: SxProps<Theme> = { left: 0, right: 'unset' };
const stickyLastSx: SxProps<Theme> = { left: 'unset', right: 0 };

const stickyHeadCellSx: SxProps<Theme> = {
  position: 'sticky',
  whiteSpace: 'nowrap',
  overflowY: 'hidden',
  background: (t) => t?.palette?.background?.paper,
  zIndex: (t) => t?.zIndex?.modal - 1,
};
const stickyBodyCellSx: SxProps<Theme> = {
  position: 'sticky',
  whiteSpace: 'nowrap',
  overflowY: 'hidden',
  background: (t) => t?.palette?.background?.paper,
  zIndex: (t) => t?.zIndex?.modal - 2,
  boxShadow: (t) => t?.shadows?.['4'],
};
export const CheckSellHeadSx: SxProps<Theme> = { ...stickyHeadCellSx, left: 0 };
export const CheckSellBodySx: SxProps<Theme> = { ...stickyBodyCellSx, left: 0 };
export const renderHeadCell = <T extends Record<string, any>>(head: ICommonTableConfig<T>) => {
  if (!head || !!head?.isHide || !head?.headCell) return null;
  const _cellProps = head?.headCellProps || {};
  if (!!head?.stickyFirst) _cellProps.sx = { ..._cellProps.sx, ...stickyHeadCellSx, ...stickyFirstSx } as any;
  if (!!head?.stickyLast) _cellProps.sx = { ..._cellProps.sx, ...stickyHeadCellSx, ...stickyLastSx } as any;
  if (typeof head.headCell === 'string' || typeof head.headCell === 'number' || typeof head.headCell === 'boolean')
    return <TableCell {..._cellProps}>{head.headCell}</TableCell>;
  return render(head.headCell, _cellProps);
};
export const renderBodyCell = <T extends Record<string, any>>(
  cell: ICommonTableConfig<T>,
  row: T,
  rowIndex?: number,
) => {
  if (!row || !cell || !!cell?.isHide) return null;
  const _cellProps = !!cell.bodyCellProps
    ? typeof cell.bodyCellProps === 'function'
      ? cell.bodyCellProps(row, rowIndex)
      : cell.bodyCellProps
    : {};
  if (!!cell?.stickyFirst) _cellProps.sx = { ..._cellProps.sx, ...stickyBodyCellSx, ...stickyFirstSx } as any;
  if (!!cell?.stickyLast) _cellProps.sx = { ..._cellProps.sx, ...stickyBodyCellSx, ...stickyLastSx } as any;
  if (!!cell.bodyCellInner)
    return <TableCell {..._cellProps}>{render(cell.bodyCellInner, { row, rowIndex })}</TableCell>;
  if (!!cell.bodyCell) return render(cell.bodyCell, { ..._cellProps, row, rowIndex });
  if (typeof cell.field === 'string') return <TableCell {..._cellProps}>{row[cell.field] || ''}</TableCell>;
  return null;
};
export const defaultContainerProps = (sx?: SxProps<Theme>): SxProps<Theme> => ({
  maxHeight: 560,
  ...sx,
  position: 'relative',
});
export const defaultTableProps = (sx?: SxProps<Theme>): SxProps<Theme> => ({
  width: '100%',
  ...sx,
});
export const defaultTableHeadProps = (sx?: SxProps<Theme>): SxProps<Theme> => ({
  ...sx,
  position: 'relative',
});
