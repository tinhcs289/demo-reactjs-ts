import type { AnyObject } from '@/types';
import type { TableRowProps } from '@mui/material/TableRow';
export default function buildTableRowProps<RowData extends AnyObject = AnyObject>(
  row: RowData, propsOrGetProps?: TableRowProps | ((row: RowData) => TableRowProps)
) {
  const props: Partial<TableRowProps<'tr', {}>> =
    (typeof propsOrGetProps === 'function' ? propsOrGetProps(row) : propsOrGetProps) || {};
  props.sx = {
    '&:last-child td, &:last-child th': { border: 0 },
    ':hover': { cursor: 'pointer' },
    ...props.sx,
  };
  return props;
}


