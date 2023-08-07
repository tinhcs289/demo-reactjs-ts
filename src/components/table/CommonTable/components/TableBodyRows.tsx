import withHOCs from '@/hocs/withHocs';
import type { AnyObject } from '@/types';
import type { TableCellProps } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import get from 'lodash/get';
import type { ComponentType } from 'react';
import { Fragment, useCallback, useMemo } from 'react';
import type { BodyRowProps, CommonTableProps } from '../_types';
import { CheckSellBodySx, stickyFirstClass } from '../constants';
import { selectTableContext } from '../context';
import buildTableRowProps from '../functions/buildTableRowProps';
import CheckCell from './CheckCell';
import TableBodyRowCells from './TableBodyRowCells';
import TableRowDetailPanel from './TableRowDetailPanel';
function withRemoveHocProps<RowData extends AnyObject = AnyObject>(
  WrappedComponent: ComponentType<BodyRowProps<RowData>>
): ComponentType<BodyRowProps<RowData>> {
  return function TableRowWithNoCustomProps(props: BodyRowProps<RowData>) {
    const {
      rowId: __rowId,
      row: __row,
      rowIndex: __rowIndex,
      totalOfCells: __totalOfCells,
      columns: __columns,
      ...otherProps
    } = props;
    return <WrappedComponent {...(otherProps as any)} />;
  };
}

const cellCheckboxProps: TableCellProps = {
  className: stickyFirstClass,
  sx: CheckSellBodySx,
};
function TableBodyRowCheckbox<RowData extends AnyObject = AnyObject>(props: {
  row: RowData;
  rowIndex?: number;
}) {
  const { row } = props;
  const isCheckAll = selectTableContext((s) => s?.isCheckAll);
  const onCheckRow = selectTableContext((s) => s?.onCheckRow);
  const isRowSelected = selectTableContext((s) => s?.isRowSelected);
  const checkRow = useCallback(
    (row: RowData) => {
      return (_checked: boolean) => {
        setTimeout(() => {
          onCheckRow?.(row);
        }, 0);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onCheckRow]
  );
  const isSelected = useCallback(
    (row: RowData) => {
      return isRowSelected?.(row) === true;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isRowSelected]
  );
  const $Checkbox = useMemo(() => {
    if (typeof isCheckAll !== 'boolean') return null;
    if (isCheckAll) return <CheckCell checked onChange={checkRow(row)} cellProps={cellCheckboxProps} />;
    let checked = isSelected(row);
    return <CheckCell checked={checked} onChange={checkRow(row)} cellProps={cellCheckboxProps} />;
  }, [isCheckAll, checkRow, isSelected, row]);
  return $Checkbox;
}
export default function TableBodyRows<RowData extends AnyObject = AnyObject>(
  props: Pick<CommonTableProps<RowData>, 'tableBodyRowProps' | 'rowHocs'>
) {
  const { tableBodyRowProps, rowHocs } = props;
  const idField = selectTableContext((s) => s?.idField);
  const columns = selectTableContext((s) => s?.columns);
  const rows = selectTableContext((s) => s?.rows);
  const totalOfCells = selectTableContext((s) => s?.totalOfCells);
  const renderRow = useCallback(
    (row: RowData, index: number, _rows?: RowData[]) => {
      if (!row) return null;
      const key = get(row, idField) as string;
      const rowKey = `common-table-row--${key}`;
      const bodyProps = buildTableRowProps(row, tableBodyRowProps);
      if (Array.isArray(rowHocs) && rowHocs.length > 0) {
        const RowComponent = withHOCs(...rowHocs, withRemoveHocProps)(TableRow);
        return (
          <Fragment key={key}>
            <TableRowDetailPanel
              position="top"
              row={row}
              index={index}
              totalOfCells={totalOfCells}
              idField={idField}
            />
            <RowComponent
              key={key}
              id={rowKey}
              rowId={rowKey}
              tabIndex={-1}
              hover
              role="checkbox"
              row={row}
              rowIndex={index}
              columns={columns as any}
              totalOfCells={totalOfCells}
              {...bodyProps}
            >
              <TableBodyRowCheckbox row={row} rowIndex={index} />
              <TableBodyRowCells row={row} rowIndex={index} />
            </RowComponent>
            <TableRowDetailPanel
              position="bottom"
              row={row}
              index={index}
              totalOfCells={totalOfCells}
              idField={idField}
            />
          </Fragment>
        );
      }
      return (
        <Fragment key={key}>
          <TableRowDetailPanel
            position="top"
            row={row}
            index={index}
            totalOfCells={totalOfCells}
            idField={idField}
          />
          <TableRow id={rowKey} tabIndex={-1} hover role="checkbox" {...bodyProps}>
            <TableBodyRowCheckbox row={row} rowIndex={index} />
            <TableBodyRowCells row={row} rowIndex={index} />
          </TableRow>
          <TableRowDetailPanel
            position="bottom"
            row={row}
            index={index}
            totalOfCells={totalOfCells}
            idField={idField}
          />
        </Fragment>
      );
    },
    [tableBodyRowProps, totalOfCells, columns, idField, rowHocs]
  );
  const $Rows = useMemo(() => rows.map(renderRow as any), [rows, renderRow]);
  return <>{$Rows}</>;
}
