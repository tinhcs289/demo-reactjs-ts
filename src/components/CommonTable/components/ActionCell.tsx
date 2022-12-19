import type { TableCellProps } from '@mui/material/TableCell';
import TableCell from '@mui/material/TableCell';

function ActionCell<T extends Record<string, any>>(props: TableCellProps & { row: T }) {
  const { row, children, ...otherProps } = props;
  return <TableCell {...otherProps}></TableCell>;
}
export default ActionCell;
