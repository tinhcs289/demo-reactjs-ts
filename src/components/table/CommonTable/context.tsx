import createFastContext from '@/helpers/contextHelpers/createFastContext';
import arrayOrEmpty from '@/helpers/formatHelpers/arrayOrEmpty';
import intOrDefault from '@/helpers/formatHelpers/intOrDefault';
import type { AnyObject } from '@/types';
import type { ReactNode } from 'react';
import { useCallback, useMemo } from 'react';
import type { CommonTableProps, Selectability } from './_types';
type TableContextValues<RowData extends AnyObject = AnyObject> = {
  idField: string;
  totalOfCells: number;
  totalOfRows: number;
  isSelectable: boolean;
  isCheckAll: boolean;
  isLoading: boolean;
  rows: Required<CommonTableProps<RowData>>['rows'];
  columns: Required<CommonTableProps<RowData>>['columns'];
  onCheckRow: Required<Selectability<RowData>>['onCheckRow'];
  isRowSelected: Required<Selectability<RowData>>['isRowSelected'];
  onCheckAll: Required<Selectability<RowData>>['onCheckAll'];
};
const { Provider, useDefaultPropInit, useGetter, useSetter } = createFastContext<TableContextValues>({
  idField: 'id',
  totalOfCells: 0,
  totalOfRows: 0,
  isSelectable: false,
  isCheckAll: false,
  isLoading: false,
  rows: [],
  columns: [],
  onCheckRow: (_row) => {},
  isRowSelected: (_row) => false,
  onCheckAll: (_checked) => {},
});
export { useGetter as selectTableContext, useSetter as setTableContext };
export function TableContextInitializer<RowData extends AnyObject = AnyObject>(
  props: Pick<CommonTableProps<RowData>, 'rows' | 'loading' | 'selectability' | 'columns' | 'idField'>
) {
  const idField = useMemo(() => props?.idField || 'id', [props?.idField]);
  useDefaultPropInit('idField', idField, true);
  const isCheckAll = useMemo(() => props?.selectability?.isCheckAll, [props?.selectability?.isCheckAll]);
  useDefaultPropInit('isCheckAll', isCheckAll, true);
  const isSelectable = useMemo(() => typeof isCheckAll === 'boolean', [isCheckAll]);
  useDefaultPropInit('isSelectable', isSelectable, true);
  const loading = useMemo(() => !!props?.loading, [props?.loading]);
  useDefaultPropInit('isLoading', loading, true);
  const columns = useMemo(() => arrayOrEmpty(props?.columns), [props?.columns]);
  useDefaultPropInit('columns', columns, true);
  const rows = useMemo(() => arrayOrEmpty(props?.rows), [props?.rows]);
  useDefaultPropInit('rows', rows, true);
  const totalOfRows = useMemo(() => intOrDefault(rows?.length, 0), [rows?.length]);
  useDefaultPropInit('totalOfRows', totalOfRows, true);
  const totalOfCells = useMemo(() => (isSelectable ? 1 : 0) + columns.length, [columns.length, isSelectable]);
  useDefaultPropInit('totalOfCells', totalOfCells, true);
  const onCheckRow = useCallback(
    (row: RowData) => props?.selectability?.onCheckRow?.(row),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props?.selectability?.onCheckRow]
  );
  useDefaultPropInit('onCheckRow', onCheckRow, true);
  const isRowSelected = useCallback(
    (row: RowData) => props?.selectability?.isRowSelected?.(row) === true,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props?.selectability?.isRowSelected]
  );
  useDefaultPropInit('isRowSelected', isRowSelected, true);
  const onCheckAll = useCallback(
    (isCheck: boolean) => props?.selectability?.onCheckAll?.(isCheck),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props?.selectability?.onCheckAll]
  );
  useDefaultPropInit('onCheckAll', onCheckAll, true);
  return <></>;
}
export function TableProvider(props: { children?: ReactNode }) {
  return <Provider>{props?.children}</Provider>;
}
