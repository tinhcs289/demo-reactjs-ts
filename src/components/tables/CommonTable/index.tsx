import arrayOrEmpty from '@/helpers/formatHelpers/arrayOrEmpty';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { cloneElement, createElement, Fragment, isValidElement, useCallback, useMemo } from 'react';
import { ICommonTableConfig, ICommonTableProps } from './types';

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
function CommonTable<T extends Record<string, any>>(props: ICommonTableProps<T>) {
  const {
    containerProps,
    tableProps,
    tableHeadProps,
    tableHeadRowProps,
    tableBodyProps,
    tableBodyRowProps,
    config,
    rows,
    children,
  } = props;

  const memoConfig = useMemo(() => {
    return arrayOrEmpty(config);
  }, [config]);

  const memoRows = useMemo(() => {
    return arrayOrEmpty(rows);
  }, [rows]);

  const renderHeadCell = (head: ICommonTableConfig<T>) => {
    if (!head || head?.isHide || !head?.headCell) return null;

    if (typeof head.headCell === 'string' || typeof head.headCell === 'number' || typeof head.headCell === 'boolean') {
      return <TableCell {...head.headCellProps}>{head.headCell}</TableCell>;
    }

    if (isValidElement(head.headCell)) {
      return cloneElement(head.headCell, head.headCellProps);
    }

    if (typeof head.headCell === 'function') {
      return createElement(head.headCell, head.headCellProps);
    }

    return null;
  };

  const renderBodyCell = (cell: ICommonTableConfig<T>, row: T) => {
    if (!row || !cell || cell?.isHide) return null;

    const _cellProps = !!cell.bodyCellProps
      ? typeof cell.bodyCellProps === 'function'
        ? cell.bodyCellProps(row)
        : cell.bodyCellProps
      : undefined;

    if (!!cell.bodyCell) {
      if (isValidElement(cell.bodyCell)) {
        return cloneElement(cell.bodyCell, { ..._cellProps, row } as Partial<unknown> & React.Attributes);
      }
    }

    if (typeof cell.bodyCell === 'function') {
      return createElement(cell.bodyCell, { ..._cellProps, row });
    }

    if (typeof cell.field === 'string') return <TableCell {..._cellProps}>{row[cell.field] || ''}</TableCell>;

    return null;
  };

  const renderRow = useCallback(
    (row: T) => {
      if (!row) return null;
      const _rowProps = typeof tableBodyRowProps === 'function' ? tableBodyRowProps(row) : tableBodyRowProps;

      return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} {..._rowProps}>
          {memoConfig.map((cell, cellIndex) => {
            return <Fragment key={cellIndex}>{renderBodyCell(cell, row)}</Fragment>;
          })}
        </TableRow>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [memoConfig, tableBodyRowProps],
  );

  return (
    <TableContainer component={Paper} {...containerProps}>
      <Table {...tableProps}>
        {useMemo(() => {
          return (
            <TableHead {...tableHeadProps}>
              <TableRow {...tableHeadRowProps}>
                {memoConfig.map((c, i) => {
                  return <Fragment key={i}>{renderHeadCell(c)}</Fragment>;
                })}
              </TableRow>
            </TableHead>
          );
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [tableHeadProps, memoConfig, tableHeadRowProps])}
        {useMemo(() => {
          return (
            <TableBody {...tableBodyProps}>
              {!!children ? (
                <>{children}</>
              ) : (
                <>
                  {memoRows.map((row, rowIndex) => {
                    return <Fragment key={rowIndex}>{renderRow(row)}</Fragment>;
                  })}
                </>
              )}
            </TableBody>
          );
        }, [tableBodyProps, memoRows, children, renderRow])}
      </Table>
    </TableContainer>
  );
}
export default CommonTable;
