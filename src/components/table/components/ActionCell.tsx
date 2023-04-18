import type { TableCellProps } from '@mui/material/TableCell';
import TableCell from '@mui/material/TableCell';
function ActionCell<RowData extends Record<string, any>>(props: TableCellProps & { row: RowData }) {
  const { row, children, ...otherProps } = props;
  return <TableCell {...otherProps}></TableCell>;
}
export default ActionCell;
