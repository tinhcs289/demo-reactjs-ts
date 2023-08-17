import type { AnyObject } from '@/types';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import debounce from 'lodash/debounce';
import type { Ref } from 'react';
import { createRef, forwardRef, useEffect, useMemo } from 'react';
import type { CommonTableProps } from './_types';
import LoadingBar from './components/LoadingBar';
import LoadingOrNoDataText from './components/LoadingOrNoDataText';
import PaperStyled from './components/PaperStyled';
import TableBodyRows from './components/TableBodyRows';
import TableContainerStyled from './components/TableContainerStyled';
import TableHeadCells, { TableHeadCellCheckAll } from './components/TableHeadCells';
import TableStyled from './components/TableStyled';
import { TableContextInitializer, TableProvider } from './context';
import buildContainerProps from './functions/buildContainerProps';
import buildTableHeadProps from './functions/buildTableHeadProps';
import buildTableProps from './functions/buildTableProps';
import initStickyColumn from './functions/initStickyColumn';
const CommonTable = forwardRef(function CommonTableWithRef<RowData extends AnyObject = AnyObject>(
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
    loading,
    idField = 'id',
    tableBodyProps,
    tableBodyRowProps,
    loadingText,
    notFoundText,
    selectability,
    columnStickyAsStack = false,
    rowHocs,
  } = props;
  const tableRef = createRef();
  //#region memo props
  const containerProps = useMemo(() => buildContainerProps(cProps), [cProps]);
  const tableProps = useMemo(() => buildTableProps(tProps), [tProps]);
  const tableHeadProps = useMemo(() => buildTableHeadProps(thProps), [thProps]);
  const tableHeadRowProps = useMemo(() => thrProps, [thrProps]);
  const isCheckAll = useMemo(() => selectability?.isCheckAll, [selectability?.isCheckAll]);
  const isSelectable = useMemo(() => typeof isCheckAll === 'boolean', [isCheckAll]);
  const columns = useMemo(() => clm || [], [clm]);
  const rows = useMemo(() => rws || [], [rws]);
  //#endregion
  //#region Render body
  const $BodyRows = useMemo(
    () => <TableBodyRows tableBodyRowProps={tableBodyRowProps} rowHocs={rowHocs} />,
    [tableBodyRowProps, rowHocs]
  );
  const $TableBody = useMemo(
    () => (
      <TableBody {...tableBodyProps}>
        <LoadingOrNoDataText loadingText={loadingText} noDataText={notFoundText} />
        {$BodyRows}
      </TableBody>
    ),
    [tableBodyProps, $BodyRows, loadingText, notFoundText]
  );
  const initSticky = () => {
    if (!(tableRef?.current instanceof Element)) return;
    const tableEl = tableRef.current as HTMLElement;
    initStickyColumn(tableEl);
  };
  //#endregion
  useEffect(() => {
    if (!!columnStickyAsStack) return;
    setTimeout(() => {
      initSticky();
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [$TableBody, columnStickyAsStack, rows, isSelectable]);
  useEffect(() => {
    const handler = debounce(() => {
      initSticky();
    }, 100);
    const resizeObserver = new ResizeObserver(handler);
    setTimeout(() => {
      initSticky();
      if (!(tableRef?.current instanceof Element)) return;
      const tableEl = tableRef.current as HTMLElement;
      resizeObserver.observe(tableEl.parentElement as any);
    }, 0);
    return () => resizeObserver.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const $Initializer = useMemo(
    () => (
      <TableContextInitializer
        idField={idField}
        columns={columns}
        rows={rows}
        loading={loading}
        selectability={selectability}
      />
    ),
    [columns, rows, loading, selectability, idField]
  );
  return (
    <TableProvider>
      {$Initializer}
      <TableContainerStyled ref={ref} {...({ component: PaperStyled } as any)} {...containerProps}>
        <LoadingBar />
        <TableStyled stickyHeader size="small" {...tableProps} ref={tableRef as any}>
          <TableHead {...tableHeadProps}>
            <TableRow {...tableHeadRowProps}>
              <TableHeadCellCheckAll />
              <TableHeadCells />
            </TableRow>
          </TableHead>
          {$TableBody}
        </TableStyled>
      </TableContainerStyled>
    </TableProvider>
  );
}) as <RowData extends AnyObject = AnyObject>(
  props: CommonTableProps<RowData>,
  ref?: Ref<HTMLDivElement>
) => JSX.Element;
export default CommonTable;
