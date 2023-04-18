import { AnyObject } from '@/types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import type { TableCellProps } from '@mui/material/TableCell';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import type { TableRowProps } from '@mui/material/TableRow';
import TableRow from '@mui/material/TableRow';
import type { Ref } from 'react';
import { createRef, forwardRef, Fragment, useCallback, useEffect, useMemo } from 'react';
import type { CommonTableProps } from '../_types';
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
} from '../style-functions';
import CheckCell from './CheckCell';
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
const CommonTable = forwardRef(function CommonTableWithRef<RowData extends AnyObject>(
  props: CommonTableProps<RowData>,
  ref?: Ref<HTMLDivElement>
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
    selectability,
    columnStickyAsStack,
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
  const isCheckAll = useMemo(() => selectability?.isCheckAll, [selectability?.isCheckAll]);
  const loading = useMemo(() => !!props?.loading, [props?.loading]);
  const memoConfig = useMemo(() => columns || [], [columns]);
  const memoRows = useMemo(() => rows || [], [rows]);
  const memoRowsLength = useMemo(
    () => (Number.isInteger(memoRows?.length) && memoRows.length > 0 ? memoRows.length : 0),
    [memoRows]
  );
  const memoTotalOfCell = useMemo(() => {
    const hasCheckCell = typeof isCheckAll === 'boolean';
    const colspan = (hasCheckCell ? 1 : 0) + (Number.isInteger(memoConfig?.length) ? memoConfig?.length : 0);
    return colspan;
  }, [memoConfig, isCheckAll]);
  //#endregion

  //#region select action
  const checkAll = useCallback(
    (checked: boolean) => {
      selectability?.onCheckAll?.(checked);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectability?.onCheckAll]
  );
  const checkRow = useCallback(
    (row: RowData) => {
      return (checked: boolean) => {
        selectability?.onCheckRow?.(row);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectability?.onCheckRow]
  );
  const isSelected = useCallback(
    (row: RowData) => {
      return selectability?.isRowSelected?.(row) === true;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectability?.isRowSelected]
  );
  //#endregion
  //#region Render body
  const $loadingOrNoDataText = useMemo(() => {
    if (!!loading) return <LoadingText>{loadingText}</LoadingText>;
    return <NoDataText>{notFoundText}</NoDataText>;
  }, [loading, loadingText, notFoundText]);
  const $noDataOrLoading = useMemo(() => {
    if (memoRowsLength > 0) return null;
    return (
      <TableRow>
        <TableCell colSpan={memoTotalOfCell}>{$loadingOrNoDataText}</TableCell>
      </TableRow>
    );
  }, [memoRowsLength, memoTotalOfCell, $loadingOrNoDataText]);
  const renderRowSelectBox = useCallback(
    (row: RowData, rowIndex?: number) => {
      if (typeof isCheckAll !== 'boolean') return null;
      const cellProps: TableCellProps = {
        className: stickyFirstClass,
        sx: CheckSellBodySx,
      };
      if (isCheckAll) return <CheckCell checked onChange={checkRow(row)} cellProps={cellProps} />;
      let checked = isSelected(row);
      return <CheckCell checked={checked} onChange={checkRow(row)} cellProps={cellProps} />;
    },
    [isCheckAll, checkRow, isSelected]
  );
  const renderRowCellList = useCallback(
    (row: RowData, rowIndex?: number) => {
      return memoConfig.map((cell) => {
        return <Fragment key={cell._key}>{renderBodyCell(cell, row, rowIndex)}</Fragment>;
      });
    },
    [memoConfig]
  );
  const renderDetailPanelRow = useCallback(
    (pos: 'top' | 'bottom', row: RowData, index: number) => {
      if (!row || !pos) return null;
      const key = row?.id || index;
      return (
        <TableRow
          id={`common-table-detail-panel-${pos}--${key}`}
          tabIndex={-1}
          hover
          role="checkbox"
          sx={{ p: 0, m: 0, td: { p: 0, m: 0 } }}
        >
          <TableCell colSpan={memoTotalOfCell} sx={{ display: 'none' }}></TableCell>
        </TableRow>
      );
    },
    [memoTotalOfCell]
  );
  const renderRow = useCallback(
    (row: RowData, index: number, rows: RowData[]) => {
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
        <Fragment key={key}>
          {renderDetailPanelRow('top', row, index)}
          <TableRow id={`common-table-row--${key}`} tabIndex={-1} {..._props} hover role="checkbox">
            {renderRowSelectBox(row, index)}
            {renderRowCellList(row, index)}
          </TableRow>
          {renderDetailPanelRow('bottom', row, index)}
        </Fragment>
      );
    },
    [tableBodyRowProps, renderRowSelectBox, renderRowCellList, renderDetailPanelRow]
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
    if (!!columnStickyAsStack || !(tableRef?.current instanceof Element)) return;
    const tableEl = tableRef.current;
    initStickyColumn(tableEl as any);
  }, [$body, tableRef, columnStickyAsStack]);
  // useEffect(() => {
  //   setTimeout(() => {
  //     if (!(tableRef?.current instanceof Element)) return;
  //     const tableEl = tableRef.current as HTMLElement;
  //     new ResizeObserver(function reInitSticky() {
  //       console.log('initStickyColumn');
  //       initStickyColumn(tableEl);
  //     }).observe(tableEl.parentElement as any);
  //   }, 0);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
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
}) as <RowData extends AnyObject>(props: CommonTableProps<RowData>, ref?: Ref<HTMLDivElement>) => JSX.Element;
export default CommonTable;
