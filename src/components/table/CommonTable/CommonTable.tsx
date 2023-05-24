import intOrDefault from '@/helpers/formatHelpers/intOrDefault';
import withHOCs from '@/hocs/withHocs';
import { AnyObject } from '@/types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import type { TableCellProps } from '@mui/material/TableCell';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import get from 'lodash/get';
import type { Ref } from 'react';
import { Fragment, createRef, forwardRef, useCallback, useEffect, useMemo } from 'react';
import type { CommonTableProps } from './_types';
import BodyCellList from './components/BodyCellList';
import CheckCell from './components/CheckCell';
import LoadingBar from './components/LoadingBar';
import LoadingText from './components/LoadingText';
import NoDataText from './components/NoDataText';
import PaperStyled from './components/PaperStyled';
import TableRowDetailPanel from './components/TableRowDetailPanel';
import { CheckSellBodySx, CheckSellHeadSx, stickyFirstClass } from './constants';
import buildContainerProps from './functions/buildContainerProps';
import buildTableHeadProps from './functions/buildTableHeadProps';
import buildTableProps from './functions/buildTableProps';
import buildTableRowProps from './functions/buildTableRowProps';
import initStickyColumn from './functions/initStickyColumn';
import renderHeadCell from './functions/renderHeadCell';
import withRemoveHocProps from './functions/withRemoveHocProps';
const CommonTable = forwardRef(function CommonTableWithRef<RowData extends AnyObject>(
  props: CommonTableProps<RowData>,
  ref?: Ref<HTMLDivElement>
) {
  const {
    rows: rws,
    columns: clm,
    containerProps: cProps,
    tableProps: tProps,
    tableHeadProps: thProps,
    tableHeadRowProps: thrProps,
    //
    idField = 'id',
    tableBodyProps,
    tableBodyRowProps,
    loadingText,
    notFoundText,
    selectability,
    columnStickyAsStack,
    rowHocs,
    //virtualized,
    //rowHeight,
  } = props;
  const tableRef = createRef();
  //#region memo props
  const containerProps = useMemo(() => buildContainerProps(cProps), [cProps]);
  const tableProps = useMemo(() => buildTableProps(tProps), [tProps]);
  const tableHeadProps = useMemo(() => buildTableHeadProps(thProps), [thProps]);
  const tableHeadRowProps = useMemo(() => thrProps, [thrProps]);
  const isCheckAll = useMemo(() => selectability?.isCheckAll, [selectability?.isCheckAll]);
  const loading = useMemo(() => !!props?.loading, [props?.loading]);
  const columns = useMemo(() => clm || [], [clm]);
  const rows = useMemo(() => rws || [], [rws]);
  const totalOfRows = useMemo(() => intOrDefault(rows?.length, 0), [rows?.length]);
  const totalOfCells = useMemo(
    () => (typeof isCheckAll === 'boolean' ? 1 : 0) + columns.length,
    [columns.length, isCheckAll]
  );
  //#endregion
  //#region select action
  const checkAll = useCallback(
    (checked: boolean) => {
      setTimeout(() => {
        selectability?.onCheckAll?.(checked);
      }, 0);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectability?.onCheckAll]
  );
  const checkRow = useCallback(
    (row: RowData) => {
      return (checked: boolean) => {
        setTimeout(() => {
          selectability?.onCheckRow?.(row);
        }, 0);
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
    if (totalOfRows > 0) return null;
    return (
      <TableRow>
        <TableCell colSpan={totalOfCells}>{$loadingOrNoDataText}</TableCell>
      </TableRow>
    );
  }, [totalOfRows, totalOfCells, $loadingOrNoDataText]);
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
  const renderRow = useCallback(
    (row: RowData, index: number, rows?: RowData[]) => {
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
              columns={columns}
              totalOfCells={totalOfCells}
              {...bodyProps}
            >
              {renderRowSelectBox(row, index)}
              <BodyCellList row={row} rowIndex={index} columns={columns} />
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
            {renderRowSelectBox(row, index)}
            <BodyCellList row={row} rowIndex={index} columns={columns} />
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
    [tableBodyRowProps, renderRowSelectBox, totalOfCells, columns, idField, rowHocs]
  );
  const $rows = useMemo(() => rows.map(renderRow), [rows, renderRow]);
  const $body = useMemo(
    () => (
      <TableBody {...tableBodyProps}>
        {$noDataOrLoading}
        {$rows}
      </TableBody>
    ),
    [tableBodyProps, $rows, $noDataOrLoading]
  );
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
    return columns.map((column) => {
      return <Fragment key={column._key}>{renderHeadCell(column)}</Fragment>;
    });
  }, [columns]);
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
    <TableContainer ref={ref} component={PaperStyled} {...containerProps}>
      {$loading}
      <Table stickyHeader {...tableProps} ref={tableRef as any}>
        <TableHead {...tableHeadProps}>
          <TableRow {...tableHeadRowProps}>
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
