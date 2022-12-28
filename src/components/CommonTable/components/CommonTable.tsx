import CheckCell from '@/components/CommonTable/components/CheckCell';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import type { TableCellProps } from '@mui/material/TableCell';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { TableRowProps } from '@mui/material/TableRow';
import type { Ref } from 'react';
import { forwardRef, Fragment, useCallback, useMemo, createRef, useEffect } from 'react';
import {
  CheckSellBodySx,
  CheckSellHeadSx,
  defaultContainerProps,
  defaultTableHeadProps,
  defaultTableProps,
  initStickyColumn,
  PaperStyled,
  renderBodyCell,
  renderHeadCell,
  stickyFirstClass,
} from '../_functions';
import type { ICommonTableProps } from '../_types';
import LoadingBar from './LoadingBar';
import LoadingText from './LoadingText';
import NoDataText from './NoDataText';

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
const CommonTable = forwardRef(function CommonTable<T extends Record<string, any>>(
  props: ICommonTableProps<T>,
  ref?: Ref<HTMLDivElement>,
) {
  const {
    rows,
    containerProps,
    tableProps,
    tableHeadProps,
    tableHeadRowProps,
    tableBodyProps,
    tableBodyRowProps,
    columns,
    loadingText,
    notFoundText,
    selectable,
  } = props;

  const tableRef = createRef();

  //#region memo props
  const memoContainerProps = useMemo(() => {
    const { sx, ..._props } = containerProps || {};
    return { ..._props, sx: defaultContainerProps(sx) };
  }, [containerProps]);

  const memoTableProps = useMemo(() => {
    const { sx, ..._props } = tableProps || {};
    return { ..._props, sx: defaultTableProps(sx) };
  }, [tableProps]);

  const memoTableHeadProps = useMemo(() => {
    const { sx, ..._props } = tableHeadProps || {};
    return { ..._props, sx: defaultTableHeadProps(sx) };
  }, [tableHeadProps]);

  const memoTableHeadRowProps = useMemo(() => tableHeadRowProps, [tableHeadRowProps]);
  const isCheckAll = useMemo(() => selectable?.isCheckAll, [selectable?.isCheckAll]);
  const loading = useMemo(() => !!props?.loading, [props?.loading]);
  const memoConfig = useMemo(() => columns || [], [columns]);
  const memoRows = useMemo(() => rows || [], [rows]);
  //#endregion

  //#region select action
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
  const $loadingOrNoDataText = useMemo(() => {
    if (!!loading) return <LoadingText>{loadingText}</LoadingText>;
    return <NoDataText>{notFoundText}</NoDataText>;
  }, [loading, loadingText, notFoundText]);

  const $noDataOrLoading = useMemo(() => {
    if (Number.isInteger(memoRows?.length) && memoRows.length > 0) return null;

    const hasCheckCell = typeof isCheckAll === 'boolean';
    const colspan = (hasCheckCell ? 1 : 0) + (Number.isInteger(memoConfig?.length) ? memoConfig?.length : 0);

    return (
      <TableRow>
        <TableCell colSpan={colspan}>{$loadingOrNoDataText}</TableCell>
      </TableRow>
    );
  }, [memoRows?.length, memoConfig?.length, isCheckAll, $loadingOrNoDataText]);

  const renderRowSelectBox = useCallback(
    (row: T, rowIndex?: number) => {
      if (typeof isCheckAll !== 'boolean') return null;

      const cellProps: TableCellProps = {
        className: stickyFirstClass,
        sx: CheckSellBodySx,
      };

      if (isCheckAll) return <CheckCell checked onChange={checkRow(row)} cellProps={cellProps} />;

      let checked = isSelected(row);
      return <CheckCell checked={checked} onChange={checkRow(row)} cellProps={cellProps} />;
    },
    [isCheckAll, checkRow, isSelected],
  );

  const renderRowCellList = useCallback(
    (row: T, rowIndex?: number) => {
      return memoConfig.map((cell) => {
        return <Fragment key={cell._key}>{renderBodyCell(cell, row, rowIndex)}</Fragment>;
      });
    },
    [memoConfig],
  );

  const renderRow = useCallback(
    (row: T, index: number, rows: T[]) => {
      if (!row) return null;
      //TODO should provider new prop as a selector callback to detect identity of a row
      const key = row?.id || index;
      const _props: TableRowProps<'tr', {}> =
        (typeof tableBodyRowProps === 'function' ? tableBodyRowProps(row) : tableBodyRowProps) || {};
      _props.sx = {
        '&:last-child td, &:last-child th': { border: 0 },
        ':hover': { cursor: 'pointer' },
        ..._props.sx,
      };
      return (
        <TableRow id={`common-table-row--${key}`} key={key} tabIndex={-1} {..._props} hover role="checkbox">
          {renderRowSelectBox(row, index)}
          {renderRowCellList(row, index)}
        </TableRow>
      );
    },
    [tableBodyRowProps, renderRowSelectBox, renderRowCellList],
  );

  const $rows = useMemo(() => {
    return <>{memoRows.map(renderRow)}</>;
  }, [memoRows, renderRow]);

  const $body = useMemo(() => {
    return (
      <TableBody {...tableBodyProps}>
        {$noDataOrLoading}
        {$rows}
      </TableBody>
    );
  }, [tableBodyProps, $rows, $noDataOrLoading]);
  //#endregion

  //#region Header render
  const $checkboxAll = useMemo(() => {
    if (typeof isCheckAll !== 'boolean') return null;
    return (
      <CheckCell
        checked={isCheckAll}
        onChange={checkAll}
        cellProps={{ className: stickyFirstClass, sx: CheckSellHeadSx }}
      />
    );
  }, [isCheckAll, checkAll]);

  const $headCells = useMemo(() => {
    return memoConfig.map((column) => {
      return <Fragment key={column._key}>{renderHeadCell(column)}</Fragment>;
    });
  }, [memoConfig]);
  //#endregion

  const $loading = useMemo(() => {
    if (!loading) return null;
    return <LoadingBar />;
  }, [loading]);

  useEffect(() => {
    if (!(tableRef?.current instanceof Element)) return;
    initStickyColumn(tableRef?.current as any);
  }, [$body, tableRef]);

  return (
    <TableContainer ref={ref} component={PaperStyled} {...memoContainerProps}>
      {$loading}
      <Table stickyHeader {...memoTableProps} ref={tableRef as any}>
        <TableHead {...memoTableHeadProps}>
          <TableRow {...memoTableHeadRowProps}>
            {$checkboxAll}
            {$headCells}
          </TableRow>
        </TableHead>
        {$body}
      </Table>
    </TableContainer>
  );
}) as <T extends Record<string, any>>(props: ICommonTableProps<T>, ref?: Ref<HTMLDivElement>) => JSX.Element;
export default CommonTable;
