import render from '@/helpers/reactHelpers/render';
import TableCell from '@mui/material/TableCell';
import type { ICommonTableConfig } from './_types';

export const renderHeadCell = <T extends Record<string, any>>(head: ICommonTableConfig<T>) => {
  if (!head || head?.isHide || !head?.headCell) return null;

  if (typeof head.headCell === 'string' || typeof head.headCell === 'number' || typeof head.headCell === 'boolean') {
    return <TableCell {...head.headCellProps}>{head.headCell}</TableCell>;
  }

  return render(head.headCell, head.headCellProps);
};

export const renderBodyCell = <T extends Record<string, any>>(cell: ICommonTableConfig<T>, row: T) => {
  if (!row || !cell || cell?.isHide) return null;

  const _cellProps = !!cell.bodyCellProps
    ? typeof cell.bodyCellProps === 'function'
      ? cell.bodyCellProps(row)
      : cell.bodyCellProps
    : undefined;

  if (!!cell.bodyCellInner) return <TableCell {..._cellProps}>{render(cell.bodyCellInner, { row })}</TableCell>;

  if (!!cell.bodyCell) return render(cell.bodyCell, { ..._cellProps, row });

  if (typeof cell.field === 'string') return <TableCell {..._cellProps}>{row[cell.field] || ''}</TableCell>;

  return null;
};
