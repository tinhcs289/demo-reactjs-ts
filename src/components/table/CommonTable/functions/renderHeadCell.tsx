import render from '@/helpers/reactHelpers/render';
import TableCell from '@mui/material/TableCell';
import type { CommonTableConfig } from '../_types';
import {
  stickyFirstClass,
  stickyFirstSx,
  stickyHeadCellSx,
  stickyLastClass,
  stickyLastSx,
} from '../constants';
export default function renderHeadCell<T extends Record<string, any>>(head: CommonTableConfig<T>) {
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
