import type {
  ICommonPaginationProps,
  ICommonTablePaginationProps,
  ICommonTableProps,
  TBodyCellInnerComponent,
  TItemMenuAction,
  TItemMenuActionComponent,
  TSelectTable,
} from '@/components/CommonTable';
import CommonTable, {
  CommonPagination,
  CommonTablePagination,
  ItemActionMenu,
} from '@/components/CommonTable';
import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { AsyncListState, RowData } from '@/functions/createAsyncListContext2';
import createAsyncListContext from '@/functions/createAsyncListContext2';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import type { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import get from 'lodash/get';
import type { MouseEventHandler } from 'react';
import { useCallback, useMemo } from 'react';
//#region  export from createAsyncListContext
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
  AsyncListSelectable,
  AsyncListSetActionCallback,
  AsyncListToggleClearSelectCallback,
  AsyncListToggleSelectCallback,
  ListState,
  OnQueryArgs,
  OnQueryCallback,
  OnQueryReturns,
  Paging,
  QueryParams,
  ReloadCallback,
  ResetCallback,
  Sort,
  SortDirect,
  UpdateFilterCallback,
  UpdatePagingCallback,
  UpdateSortCallback,
} from './createAsyncListContext2';
export type { AsyncListState, RowData };
export { isValidResult } from './createAsyncListContext2';
//#region
export type AsyncListTableProps<T extends RowData> = Omit<
  ICommonTableProps<T>,
  'rows' | 'selectable' | 'loading'
>;
export type AsyncListPagingProps = Omit<
  ICommonPaginationProps,
  'pageIndex' | 'pageSize' | 'totalCount' | 'onChange'
>;
export type AsyncListTablePagingProps = Omit<
  ICommonTablePaginationProps,
  'pageIndex' | 'pageSize' | 'totalCount' | 'onChange'
>;
export type AsyncListItemActionMenuProps<T extends RowData> = Omit<
  MenuProps,
  'anchorEl' | 'open' | 'onClose'
> & {
  actionType?: string;
  actions?: TItemMenuAction<T>[];
};
const anchorOrigin = { vertical: 'top', horizontal: 'right' };
const transformOrigin = { vertical: 'top', horizontal: 'right' };
export default function createAsyncListContext2WithComponents<T extends RowData>(
  defaultState?: Partial<AsyncListState<T>>
) {
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
    const getId = useCallback((row: T) => get(row, idField), [idField]);
    const isSelected = useCallback(
      (row: T) => selectedItemIds.includes(getId(row)),
      [selectedItemIds, getId]
    );
    const { checkAll, check } = useAsyncListAction();
    const selectable: TSelectTable<T> = useMemo(() => {
      return {
        isCheckAll,
        onCheckAll: checkAll,
        onCheckRow: check,
        isRowSelected: isSelected,
      };
    }, [isCheckAll, checkAll, check, isSelected]);
    const loading = useMemo(() => {
      return fetchStatus === EApiRequestStatus.REQUESTING;
    }, [fetchStatus]);
    const $Return = useMemo(
      () => (
        <CommonTable
          rows={data}
          columns={columns}
          loading={loading}
          selectable={selectable}
          {...otherProps}
        />
      ),
      [data, columns, loading, selectable, otherProps]
    );
    return $Return;
  }
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
  const AsyncListItemActionMenuToggle: TBodyCellInnerComponent<T, { actionType?: string }> = (props) => {
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
  };
  function AsyncListItemActionMenu(props: AsyncListItemActionMenuProps<T>) {
    const { actionType, actions, ...otherProps } = props;
    const memoAction = useMemo(() => actionType || 'MORE_ACTION', [actionType]);
    const { clearAction } = useAsyncListAction();
    const { anchorEl, interactItem, isActionWithInteractAndAncholElement } = useAsyncListInteract();
    // const [list] = useAsyncList((s) => s);
    // const memoConfigs = useMemo(() => {
    //   return Array.isArray(actions)
    //     ? actions.map((a) => {
    //         if (!a?.onClick) return a;
    //         const _onClick = a.onClick;
    //         a.onClick = (i, e) => {
    //           _onClick(i, e, list as any);
    //         };
    //         return a;
    //       })
    //     : [];
    // }, [actions, list]);
    const open = useMemo(
      () => isActionWithInteractAndAncholElement?.(memoAction) || false,
      [isActionWithInteractAndAncholElement, memoAction]
    );
    const $Return = useMemo(
      () => (
        <ItemActionMenu
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
  const AsyncListItemActionMenuDelete: TItemMenuActionComponent<T> = (props) => {
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
  };
  const AsyncListItemActionMenuEdit: TItemMenuActionComponent<T> = (props) => {
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
  };
  return {
    AsyncListProvider,
    useAsyncListAction,
    useAsyncListGetter,
    useAsyncListSetter,
    useAsyncListInteract,
    AsyncListTable,
    AsyncListTablePaging,
    AsyncListPaging,
    AsyncListItemActionMenuToggle,
    AsyncListItemActionMenu,
    AsyncListItemActionMenuEdit,
    AsyncListItemActionMenuDelete,
  };
}
