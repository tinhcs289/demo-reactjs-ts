import CheckCell from '@/components/CommonTable/components/CheckCell';
import newGuid from '@/helpers/stringHelpers/newGuid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { Ref } from 'react';
import { forwardRef, Fragment, useCallback, useMemo } from 'react';
import { renderBodyCell, renderHeadCell } from './_functions';
import type { ICommonTableConfig, ICommonTableProps } from './_types';

/**
 * @example
    <CommonTable
        rows={rows}
        config={[
          {
              field: 'name',
              headCell: '1',
              headCellProps: {
              align: 'left',
              },
              bodyCellProps: {
              align: 'left',
              },
          },
          {
              field: 'calories',
              headCell: <TableCell>2</TableCell>,
              headCellProps: {
              align: 'right',
              },
              bodyCell: CustomCell2,
              bodyCellProps: {
              align: 'right',
              },
          },
          {
              field: 'carbs',
              headCell: CustomCell,
              headCellProps: {
              align: 'right',
              },
              bodyCellProps: {
              align: 'right',
              },
          },
          {
              field: 'fat',
              headCell: CustomCell2,
              headCellProps: {
              align: 'right',
              },
              bodyCellProps: {
              align: 'right',
              },
          },
        ]}
    />
 */
function CommonTableFC<T extends Record<string, any>>(props: ICommonTableProps<T>, ref?: Ref<HTMLDivElement>) {
  const {
    rows,
    containerProps,
    tableProps,
    tableHeadProps,
    tableHeadRowProps,
    tableBodyProps,
    tableBodyRowProps,
    config,
    children,
    selectable,
  } = props;

  //#region memo props
  const memoContainerProps = useMemo(() => {
    return containerProps;
  }, [containerProps]);

  const memoTableProps = useMemo(() => {
    return tableProps;
  }, [tableProps]);

  const memoTableHeadProps = useMemo(() => {
    return tableHeadProps;
  }, [tableHeadProps]);

  const memoTableHeadRowProps = useMemo(() => {
    return tableHeadRowProps;
  }, [tableHeadRowProps]);

  const isCheckAll = useMemo(() => {
    return selectable?.isCheckAll;
  }, [selectable?.isCheckAll]);

  const memoConfig = useMemo(() => {
    return config || [];
  }, [config]);

  const memoRows = useMemo(() => {
    return rows || [];
  }, [rows]);
  //#endregion

  //#region action
  const checkAll = useCallback(
    (checked: boolean) => {
      selectable?.onCheckAll?.(checked);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectable?.onCheckAll],
  );

  const checkRow = useCallback(
    (row: T) => {
      return (checked: boolean) => {
        selectable?.onCheckRow?.(row);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectable?.onCheckRow],
  );

  const isSelected = useCallback(
    (row: T) => {
      return selectable?.isRowSelected?.(row) === true;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectable?.isRowSelected],
  );
  //#endregion

  //#region Render body
  const renderRowSelectBox = useCallback(
    (row: T) => {
      if (typeof isCheckAll !== 'boolean') return null;

      if (isCheckAll) return <CheckCell checked onChange={checkRow(row)} />;

      let checked = isSelected(row);
      return <CheckCell checked={checked} onChange={checkRow(row)} />;
    },
    [isCheckAll, checkRow, isSelected],
  );

  const renderRowCellList = useCallback(
    (row: T) => {
      return memoConfig.map((cell) => {
        return <Fragment key={cell._key}>{renderBodyCell(cell, row)}</Fragment>;
      });
    },
    [memoConfig],
  );

  const renderRow = useCallback(
    (row: T, index: number, rows: T[]) => {
      if (!row) return null;
      const _rowProps = typeof tableBodyRowProps === 'function' ? tableBodyRowProps(row) : tableBodyRowProps;
      const key = row?.id || index;

      return (
        <TableRow
          key={key}
          id={`common-table-row--${key}`}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          {..._rowProps}
        >
          {renderRowSelectBox(row)}
          {renderRowCellList(row)}
        </TableRow>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [memoConfig, tableBodyRowProps, renderRowSelectBox],
  );

  const memoRowsRender = useMemo(() => {
    return <>{memoRows.map(renderRow)}</>;
  }, [memoRows, renderRow]);

  const memoBodyRender = useMemo(() => {
    return <TableBody {...tableBodyProps}>{!children ? memoRowsRender : children}</TableBody>;
  }, [tableBodyProps, children, memoRowsRender]);
  //#endregion

  //#region Header render
  const checkAllRender = useMemo(() => {
    if (typeof isCheckAll !== 'boolean') return null;
    return <CheckCell checked={isCheckAll} onChange={checkAll} />;
  }, [isCheckAll, checkAll]);

  const headerCellListRender = useMemo(() => {
    return memoConfig.map((config) => {
      return <Fragment key={config._key}>{renderHeadCell(config)}</Fragment>;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //#endregion

  return (
    <TableContainer ref={ref} component={Paper} {...memoContainerProps}>
      <Table {...memoTableProps}>
        <TableHead {...memoTableHeadProps}>
          <TableRow {...memoTableHeadRowProps}>
            {checkAllRender}
            {headerCellListRender}
          </TableRow>
        </TableHead>
        {memoBodyRender}
      </Table>
    </TableContainer>
  );
}
const CommonTable = forwardRef(CommonTableFC) as <T extends Record<string, any>>(
  props: ICommonTableProps<T>,
  ref?: Ref<HTMLDivElement>,
) => JSX.Element;
export default CommonTable;
export const tableConfig = <T extends Record<string, any>>(
  ...headers: Array<Omit<ICommonTableConfig<T>, '_key'>>
): Array<ICommonTableConfig<T>> => {
  return headers.map((head) => ({ ...head, _key: newGuid() }));
};
