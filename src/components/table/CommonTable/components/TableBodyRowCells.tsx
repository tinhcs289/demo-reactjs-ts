import render from '@/helpers/reactHelpers/render';
import { AnyObject } from '@/types';
import TableCell from '@mui/material/TableCell';
import { Fragment, useMemo } from 'react';
import type { CommonTableConfig } from '../_types';
import {
  stickyBodyCellSx,
  stickyFirstClass,
  stickyFirstSx,
  stickyLastClass,
  stickyLastSx,
} from '../constants';
import { selectTableContext } from '../context';
function renderBodyCell<T extends Record<string, any>>(
  cell: CommonTableConfig<T>,
  row: T,
  rowIndex?: number
) {
  if (!row || !cell || !!cell?.isHide) return null;
  const props = !!cell.bodyCellProps
    ? typeof cell.bodyCellProps === 'function'
      ? cell.bodyCellProps(row, rowIndex)
      : cell.bodyCellProps
    : {};
  if (!!cell?.stickyFirst) {
    props.sx = { ...props.sx, ...stickyBodyCellSx, ...stickyFirstSx } as any;
    if (!`${props.className || ''}`.includes(stickyFirstClass))
      props.className = `${props.className || ''} ${stickyFirstClass}`;
  } else if (!!cell?.stickyLast) {
    props.sx = { ...props.sx, ...stickyBodyCellSx, ...stickyLastSx } as any;
    if (!`${props.className || ''}`.includes(stickyLastClass))
      props.className = `${props.className || ''} ${stickyLastClass}`;
  }
  if (!!cell.bodyCellInner)
    return <TableCell {...props}>{render(cell.bodyCellInner, { row, rowIndex })}</TableCell>;
  if (!!cell.bodyCell) return render(cell.bodyCell, { ...props, row, rowIndex });
  if (typeof cell.field === 'string') return <TableCell {...props}>{row[cell.field] || ''}</TableCell>;
  return null;
}
export default function TableBodyRowCells<RowData extends AnyObject>(props: {
  row: RowData;
  rowIndex: number;
}) {
  const { row, rowIndex } = props;
  const columns = selectTableContext((s) => s?.columns);
  const $Cells = useMemo(
    () => (
      <>
        {columns.map((cell) => {
          return <Fragment key={cell._key}>{renderBodyCell(cell, row, rowIndex)}</Fragment>;
        })}
      </>
    ),
    [columns, row, rowIndex]
  );
  return $Cells;
}
