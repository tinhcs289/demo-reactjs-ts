import CheckCell from '@/components/CommonTable/components/CheckCell';
import newGuid from '@/helpers/stringHelpers/newGuid';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import type { SxProps, Theme } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { Ref } from 'react';
import { forwardRef, Fragment, useCallback, useMemo } from 'react';
import { renderBodyCell, renderHeadCell } from './_functions';
import type { ICommonTableConfig, ICommonTableProps } from './_types';

/**
 * @example
    <CommonTable
        rows={rows}
        columns={[
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
    columns,
    children,
    loadingText,
    notFoundText,
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
    if (!tableHeadProps)
      return {
        sx: {
          position: 'relative',
        } as SxProps<Theme>,
      } as any;

    const { sx, ...otherTableHeadProps } = tableHeadProps;
    return {
      ...otherTableHeadProps,
      sx: {
        ...sx,
        position: 'relative',
      },
    } as any;
  }, [tableHeadProps]);

  const memoTableHeadRowProps = useMemo(() => {
    return tableHeadRowProps;
  }, [tableHeadRowProps]);

  const isCheckAll = useMemo(() => {
    return selectable?.isCheckAll;
  }, [selectable?.isCheckAll]);

  const loading = useMemo(() => {
    return !!props?.loading;
  }, [props?.loading]);

  const memoConfig = useMemo(() => {
    return columns || [];
  }, [columns]);

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

  const emptyRowRender = useMemo(() => {
    if (Number.isInteger(memoRows?.length) && memoRows.length > 0) return null;

    const hasCheckCell = typeof isCheckAll === 'boolean';
    const colspan = (hasCheckCell ? 1 : 0) + (Number.isInteger(memoConfig?.length) ? memoConfig?.length : 0);

    return (
      <TableRow>
        <TableCell colSpan={colspan}>
          <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
            {loading ? (
              <>
                <FindInPageIcon />
                &nbsp;{loadingText || `loading...`}
              </>
            ) : (
              <>
                <SearchOffIcon />
                &nbsp;{notFoundText || `No data!`}
              </>
            )}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }, [memoRows?.length, memoConfig?.length, isCheckAll, loading, loadingText, notFoundText]);

  const memoRowsRender = useMemo(() => {
    return <>{memoRows.map(renderRow)}</>;
  }, [memoRows, renderRow]);

  const memoBodyRender = useMemo(() => {
    return (
      <TableBody {...tableBodyProps}>
        {emptyRowRender}
        {!children ? memoRowsRender : children}
      </TableBody>
    );
  }, [tableBodyProps, children, memoRowsRender, emptyRowRender]);
  //#endregion

  //#region Header render
  const checkAllRender = useMemo(() => {
    if (typeof isCheckAll !== 'boolean') return null;
    return <CheckCell checked={isCheckAll} onChange={checkAll} />;
  }, [isCheckAll, checkAll]);

  const headerCellListRender = useMemo(() => {
    return memoConfig.map((column) => {
      return <Fragment key={column._key}>{renderHeadCell(column)}</Fragment>;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadingRender = useMemo(() => {
    if (!loading) return null;

    return (
      <LinearProgress
        color="primary"
        sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', zIndex: (theme) => theme.zIndex.modal }}
      />
    );
  }, [loading]);
  //#endregion

  return (
    <TableContainer ref={ref} component={Paper} {...memoContainerProps}>
      <Table {...memoTableProps}>
        <TableHead {...memoTableHeadProps}>
          <TableRow {...memoTableHeadRowProps}>
            {checkAllRender}
            {headerCellListRender}
          </TableRow>
          {loadingRender}
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
