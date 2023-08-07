import type {
  BodyCellInnerRenderFunctionArgs,
  CommonPaginationProps,
  CommonTablePaginationProps,
  CommonTableProps,
  ItemMenuActionConfig,
  ItemMenuActionRenderArgs,
  Selectability,
} from '@/components/table';
import {
  CommonPagination,
  CommonTable,
  CommonTableActionsPopover,
  CommonTablePagination,
  withColumnVisibility,
} from '@/components/table';
import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { AsyncListState, QueryParams, RowData } from '@/helpers/contextHelpers/createAsyncListContext';
import createAsyncListContext from '@/helpers/contextHelpers/createAsyncListContext';
import { AnyObject } from '@/types';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import type { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import get from 'lodash/get';
import type { ComponentType, MouseEventHandler } from 'react';
import { useCallback, useMemo } from 'react';
//#region  export from createAsyncListContext
export { isValidResult } from './createAsyncListContext';
export type {
  AsyncListCheckOrUncheckAllItemsCallback,
  AsyncListCheckOrUncheckItemCallback,
  AsyncListClearActionCallback,
  AsyncListConfig,
  AsyncListData,
  AsyncListDataActions,
  AsyncListDispatch,
  AsyncListInteract,
  AsyncListInteractAction,
  AsyncListInteractActions,
  AsyncListSelectability,
  AsyncListSetActionCallback,
  AsyncListToggleClearSelectCallback,
  AsyncListToggleSelectCallback,
  ListState,
  OnQueryArgs,
  OnQueryCallback,
  OnQueryReturns,
  Paging,
  PatchFilterCallback,
  ReloadCallback,
  ResetCallback,
  Sort,
  SortDirect,
  UpdateFilterCallback,
  UpdatePagingCallback,
  UpdateSortCallback,
} from './createAsyncListContext';
export type { AsyncListState, QueryParams, RowData };
//#region
export type AsyncListTableProps<T extends RowData> = Omit<
  CommonTableProps<T>,
  'rows' | 'selectability' | 'loading'
>;
export type AsyncListPagingProps = Omit<
  CommonPaginationProps,
  'pageIndex' | 'pageSize' | 'totalCount' | 'onChange'
>;
export type AsyncListTablePagingProps = Omit<
  CommonTablePaginationProps,
  'pageIndex' | 'pageSize' | 'totalCount' | 'onChange'
>;
export type AsyncListItemActionsPopoverProps<T extends RowData> = Omit<
  MenuProps,
  'anchorEl' | 'open' | 'onClose'
> & {
  actionType?: string;
  actions?: ItemMenuActionConfig<T>[];
};
const anchorOrigin = { vertical: 'top', horizontal: 'right' };
const transformOrigin = { vertical: 'top', horizontal: 'right' };
export default function createAsyncListContextWithComponents<
  T extends RowData = RowData,
  U extends QueryParams = QueryParams,
>(defaultState?: Partial<AsyncListState<T, U>>) {
  const {
    AsyncListProvider,
    useAsyncListAction,
    useAsyncListGetter,
    useAsyncListSetter,
    useAsyncListInteract,
  } = createAsyncListContext<T>(defaultState);
  function AsyncListTable(props: AsyncListTableProps<T>) {
    const { columns, ...otherProps } = props;
    const data = useAsyncListGetter((s) => s.dataInPage);
    const fetchStatus = useAsyncListGetter((s) => s.fetchStatus);
    const isCheckAll = useAsyncListGetter((s) => s.isCheckAll);
    const idField = useAsyncListGetter((s) => s.idField);
    const selectedItemIds = useAsyncListGetter((s) => s.selectedItemIds);
    const selectable = useAsyncListGetter((s) => s.selectable);
    const getId = useCallback((row: T) => get(row, idField) as string, [idField]);
    const isSelected = useCallback(
      (row: T) => selectedItemIds.includes(getId(row)),
      [selectedItemIds, getId]
    );
    const { checkAll, checkOrUncheck } = useAsyncListAction();
    const selectability: Selectability<T> | undefined = useMemo(() => {
      if (!selectable) return undefined;
      return {
        isCheckAll,
        onCheckAll: checkAll,
        onCheckRow: checkOrUncheck,
        isRowSelected: isSelected,
      };
    }, [isCheckAll, checkAll, checkOrUncheck, isSelected, selectable]);
    const loading = useMemo(() => {
      return fetchStatus === EApiRequestStatus.REQUESTING;
    }, [fetchStatus]);
    const $Return = useMemo(
      () => (
        <CommonTable
          idField={idField}
          rows={data}
          columns={columns}
          loading={loading}
          selectability={selectability}
          {...otherProps}
        />
      ),
      [data, columns, loading, selectability, otherProps, idField]
    );
    return $Return;
  }
  const AsyncListTableWithColumnVisibility = withColumnVisibility(AsyncListTable) as ComponentType<
    AsyncListTableProps<T>
  >;
  function AsyncListTablePaging(props: AsyncListTablePagingProps) {
    const pageIndex = useAsyncListGetter((s) => s.pageIndex);
    const pageSize = useAsyncListGetter((s) => s.pageSize);
    const totalCount = useAsyncListGetter((s) => s.totalCount);
    const { updatePaging } = useAsyncListAction();
    const handleChangePage = useCallback(
      (page: number, size: number) => {
        updatePaging?.(page, size);
      },
      [updatePaging]
    );
    const $Return = useMemo(() => {
      return (
        <CommonTablePagination
          {...props}
          pageIndex={pageIndex}
          pageSize={pageSize}
          totalCount={totalCount}
          onChange={handleChangePage}
        />
      );
    }, [props, pageIndex, pageSize, totalCount, handleChangePage]);
    return $Return;
  }
  function AsyncListPaging(props: AsyncListPagingProps) {
    const pageIndex = useAsyncListGetter((s) => s.pageIndex);
    const pageSize = useAsyncListGetter((s) => s.pageSize);
    const totalCount = useAsyncListGetter((s) => s.totalCount);
    const { updatePaging } = useAsyncListAction();
    const handleChangePage = useCallback(
      (page: number) => {
        updatePaging?.(page, pageSize);
      },
      [updatePaging, pageSize]
    );
    const $Return = useMemo(
      () => (
        <CommonPagination
          {...props}
          pageIndex={pageIndex}
          pageSize={pageSize}
          totalCount={totalCount}
          onChange={handleChangePage}
        />
      ),
      [props, pageIndex, pageSize, totalCount, handleChangePage]
    );
    return $Return;
  }
  function AsyncListItemActionsPopoverToggle(
    props: BodyCellInnerRenderFunctionArgs<T, { actionType?: string }>
  ) {
    const { row, actionType } = props;
    const action = useMemo(() => actionType || 'MORE_ACTION', [actionType]);
    const { setAction } = useAsyncListAction();
    const item = useMemo(() => row, [row]);
    const toggleAction: MouseEventHandler<HTMLButtonElement> = useCallback(
      (event) => {
        event?.stopPropagation?.();
        event?.preventDefault?.();
        if (!event?.target) return;
        if (!item) return;
        setAction({ item, action, element: event.target });
        return;
      },
      [item, action, setAction]
    );
    const $Return = useMemo(() => {
      return (
        <IconButton onClick={toggleAction}>
          <MoreVertIcon />
        </IconButton>
      );
    }, [toggleAction]);
    return $Return;
  }
  function AsyncListItemActionsPopover(props: AsyncListItemActionsPopoverProps<T>) {
    const { actionType, actions, ...otherProps } = props;
    const memoAction = useMemo(() => actionType || 'MORE_ACTION', [actionType]);
    const { clearAction } = useAsyncListAction();
    const { anchorEl, interactItem, isActionWithInteractAndAncholElement } = useAsyncListInteract();
    const open = useMemo(
      () => isActionWithInteractAndAncholElement?.(memoAction) || false,
      [isActionWithInteractAndAncholElement, memoAction]
    );
    const $Return = useMemo(
      () => (
        <CommonTableActionsPopover
          dataItem={interactItem as T}
          anchorEl={anchorEl}
          onClose={clearAction}
          open={open}
          anchorOrigin={anchorOrigin as any}
          transformOrigin={transformOrigin as any}
          actions={actions}
          {...otherProps}
        />
      ),
      [interactItem, anchorEl, actions, open, otherProps, clearAction]
    );
    return $Return;
  }
  function AsyncListItemActionsPopoverDelete(props: ItemMenuActionRenderArgs<T, AnyObject>) {
    const { icon, label, props: otherProps } = props;
    const { setAction } = useAsyncListAction();
    const handleClick = useCallback(() => {
      setAction?.({ action: 'DELETE', keepInteract: true, keepAnchor: true });
    }, [setAction]);
    const $Icon = useMemo(() => <>{icon?.() || null}</>, [icon]);
    const $Label = useMemo(() => <>{label?.() || null}</>, [label]);
    const $Return = useMemo(
      () => (
        <MenuItem {...(otherProps as any)} onClick={handleClick}>
          {$Icon}
          {$Label}
        </MenuItem>
      ),
      [$Icon, $Label, handleClick, otherProps]
    );
    return $Return;
  }
  function AsyncListItemActionsPopoverEdit(props: ItemMenuActionRenderArgs<T, AnyObject>) {
    const { icon, label, props: otherProps } = props;
    const { setAction } = useAsyncListAction();
    const handleClick = useCallback(() => {
      setAction?.({ action: 'OPEN_DETAIL', keepInteract: true });
    }, [setAction]);
    const $Icon = useMemo(() => <>{icon?.() || null}</>, [icon]);
    const $Label = useMemo(() => <>{label?.() || null}</>, [label]);
    const $Return = useMemo(
      () => (
        <MenuItem {...(otherProps as any)} onClick={handleClick}>
          {$Icon}
          {$Label}
        </MenuItem>
      ),
      [$Icon, $Label, handleClick, otherProps]
    );
    return $Return;
  }
  return {
    AsyncListProvider,
    useAsyncListAction,
    useAsyncListGetter,
    useAsyncListSetter,
    useAsyncListInteract,
    AsyncListTable,
    AsyncListTableWithColumnVisibility,
    AsyncListTablePaging,
    AsyncListPaging,
    AsyncListItemActionsPopoverToggle,
    AsyncListItemActionsPopover,
    AsyncListItemActionsPopoverEdit,
    AsyncListItemActionsPopoverDelete,
  };
}
