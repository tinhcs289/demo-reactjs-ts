import { AnyObject } from '@/types';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import get from 'lodash/get';
import { useMemo } from 'react';
export default function TableRowDetailPanel<RowData extends AnyObject>(props: {
  idField: string;
  position: 'top' | 'bottom';
  row: RowData;
  index: number;
  totalOfCells: number;
}) {
  const { idField = 'id', position, row, totalOfCells } = props;
  const rowId = useMemo(() => get(row, idField), [row, idField]);
  return (
    <TableRow
      id={`common-table-detail-panel-${position}--${rowId}`}
      tabIndex={-1}
      hover
      role="checkbox"
      sx={{ p: 0, m: 0, td: { p: 0, m: 0 } }}
    >
      <TableCell colSpan={totalOfCells} sx={{ display: 'none' }}></TableCell>
    </TableRow>
  );
}
