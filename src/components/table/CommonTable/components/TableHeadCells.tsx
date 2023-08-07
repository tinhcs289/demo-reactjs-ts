import render from '@/helpers/reactHelpers/render';
import TableCell from '@mui/material/TableCell';
import { Fragment, useMemo } from 'react';
import type { CommonTableConfig } from '../_types';
import {
  CheckSellHeadSx,
  stickyFirstClass,
  stickyFirstSx,
  stickyHeadCellSx,
  stickyLastClass,
  stickyLastSx,
} from '../constants';
import { selectTableContext } from '../context';
import CheckCell from './CheckCell';
function renderHeadCell<T extends Record<string, any>>(head: CommonTableConfig<T>) {
  if (!head || !!head?.isHide || !head?.headCell) return null;
  const props = head?.headCellProps || {};
  if (!!head?.stickyFirst) {
    props.sx = { ...props.sx, ...stickyHeadCellSx, ...stickyFirstSx } as any;
    if (!`${props.className || ''}`.includes(stickyFirstClass))
      props.className = `${props.className || ''} ${stickyFirstClass}`;
  } else if (!!head?.stickyLast) {
    props.sx = { ...props.sx, ...stickyHeadCellSx, ...stickyLastSx } as any;
    if (!`${props.className || ''}`.includes(stickyLastClass))
      props.className = `${props.className || ''} ${stickyLastClass}`;
  }
  if (
    typeof head.headCell === 'string' ||
    typeof head.headCell === 'number' ||
    typeof head.headCell === 'boolean'
  )
    return <TableCell {...props}>{head.headCell}</TableCell>;
  return render(head.headCell, props);
}
export default function TableHeadCells() {
  const columns = selectTableContext((s) => s?.columns);
  const $Cells = useMemo(() => {
    return columns.map((column) => {
      return <Fragment key={column._key}>{renderHeadCell(column)}</Fragment>;
    });
  }, [columns]);
  return $Cells;
}
export function TableHeadCellCheckAll() {
  const isCheckAll = selectTableContext((s) => s?.isCheckAll);
  const onCheckAll = selectTableContext((s) => s?.onCheckAll);
  const $Cell = useMemo(() => {
    if (typeof isCheckAll !== 'boolean') return null;
    return (
      <CheckCell
        checked={isCheckAll}
        onChange={onCheckAll}
        cellProps={{ className: stickyFirstClass, sx: CheckSellHeadSx }}
      />
    );
  }, [isCheckAll, onCheckAll]);
  return $Cell;
}
