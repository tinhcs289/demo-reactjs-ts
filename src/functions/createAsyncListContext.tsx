import CommonTable from '@/components/CommonTable';
import CommonPagination from '@/components/CommonTable/components/CommonPagination';
import type { ICommonPaginationProps, ICommonTableProps, TBodyCellComponent } from '@/components/CommonTable/_types';
import createFastContext from '@/functions/createFastContext';
import useAsyncListState from '@/hooks/useAsyncListState';
import { ACTION, DEFAULT_DATA, ERequestStatus } from '@/hooks/useAsyncListState/constants';
import type {
  IUseListStateParams,
  IUseListStateReturnsAction,
  IUseListStateReturnsControl,
  IUseListStateReturnsState,
} from '@/hooks/useAsyncListState/_types';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import TableCell from '@mui/material/TableCell';
import isEqual from 'lodash/isEqual';
import type { FC, MouseEventHandler, ReactNode } from 'react';
import { useCallback, useEffect, useMemo } from 'react';
import type { MenuProps } from '@mui/material/Menu';

export function createAsyncListContext<T extends { [x: string]: any }>() {
  const { Provider, useStore } = createFastContext<
    Omit<IUseListStateReturnsState<T>, ' isShowMultiAction' | 'isSelected'> & {
      isSelected?: (item: T) => boolean;
      isShowMultiAction?: () => boolean;
      control?: IUseListStateReturnsControl<T>;
      action?: IUseListStateReturnsAction<T>;
    }
  >(DEFAULT_DATA as any);

  const useListControl = () => {
    const [control] = useStore((s) => s.control);

    const updatePaging = useMemo(() => {
      return control?.updatePaging;
    }, [control?.updatePaging]);

    const updateSort = useMemo(() => {
      return control?.updateSort;
    }, [control?.updateSort]);

    const updateFilter = useMemo(() => {
      return control?.updateFilter;
    }, [control?.updateFilter]);

    const reload = useMemo(() => {
      return control?.reload;
    }, [control?.reload]);

    const toggleSelectable = useMemo(() => {
      return control?.toggleSelectable;
    }, [control?.toggleSelectable]);

    const setSelectedItems = useMemo(() => {
      return control?.setSelectedItems;
    }, [control?.setSelectedItems]);

    const clearSelectItems = useMemo(() => {
      return control?.clearSelectItems;
    }, [control?.clearSelectItems]);

    const checkOneItem = useMemo(() => {
      return control?.checkOneItem;
    }, [control?.checkOneItem]);

    const checkAllItems = useMemo(() => {
      return control?.checkAllItems;
    }, [control?.checkAllItems]);

    return {
      updatePaging,
      updateSort,
      updateFilter,
      reload,
      toggleSelectable,
      setSelectedItems,
      clearSelectItems,
      checkOneItem,
      checkAllItems,
    };
  };

  const useListAction = () => {
    const [action] = useStore((s) => s.action);
    const [_isSelected] = useStore((s) => s.isSelected);
    const [_isShowMultiAction] = useStore((s) => s.isShowMultiAction);

    const isSelected = useMemo(() => {
      return _isSelected;
    }, [_isSelected]);

    const isShowMultiAction = useMemo(() => {
      return _isShowMultiAction;
    }, [_isShowMultiAction]);

    const is = useMemo(() => {
      return action?.is;
    }, [action?.is]);

    const isItemInteractAction = useMemo(() => {
      return action?.isItemInteractAction;
    }, [action?.isItemInteractAction]);

    const isItemInteractWithAnchorAction = useMemo(() => {
      return action?.isItemInteractWithAnchorAction;
    }, [action?.isItemInteractWithAnchorAction]);

    const set = useMemo(() => {
      return action?.set;
    }, [action?.set]);

    const clear = useMemo(() => {
      return action?.clear;
    }, [action?.clear]);

    return {
      is,
      isItemInteractAction,
      isItemInteractWithAnchorAction,
      set,
      clear,
      isSelected,
      isShowMultiAction,
    };
  };

  const ListInit: FC<IUseListStateParams<T>> = (props) => {
    const {
      state: {
        data: _data,
        listState: _listState,
        fetchState: _fetchState,
        selectedItems: _selectedItems,
        isCheckAll: _isCheckAll,
        interactItem: _interactItem,
        anchorEl: _anchorEl,
        selectable: _selectable,
        isSelected: _isSelected,
        isShowMultiAction: _isShowMultiAction,
      },
      control: _control,
      action: _action,
    } = useAsyncListState(props);

    const [data, _set] = useStore((s) => s.data);
    const [listState] = useStore((s) => s.listState);
    const [fetchState] = useStore((s) => s.fetchState);
    const [selectedItems] = useStore((s) => s.selectedItems);
    const [isCheckAll] = useStore((s) => s.isCheckAll);
    const [interactItem] = useStore((s) => s.interactItem);
    const [anchorEl] = useStore((s) => s.anchorEl);
    const [selectable] = useStore((s) => s.selectable);

    useEffect(() => {
      _set({ isShowMultiAction: _isShowMultiAction });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_isShowMultiAction]);

    useEffect(() => {
      _set({ isSelected: _isSelected });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_isSelected]);

    useEffect(() => {
      _set({ control: _control });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_control]);

    useEffect(() => {
      _set({ action: _action });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_action]);

    useEffect(() => {
      if (isEqual(_data, data)) return;
      _set({ data: _data });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_data]);

    useEffect(() => {
      if (isEqual(_listState, listState)) return;
      _set({ listState: _listState });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_listState]);

    useEffect(() => {
      if (isEqual(_fetchState, fetchState)) return;
      _set({ fetchState: _fetchState });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_fetchState]);

    useEffect(() => {
      if (isEqual(_selectedItems, selectedItems)) return;
      _set({ selectedItems: _selectedItems });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_selectedItems]);

    useEffect(() => {
      if (isEqual(_isCheckAll, isCheckAll)) return;
      _set({ isCheckAll: _isCheckAll });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_isCheckAll]);

    useEffect(() => {
      if (isEqual(_interactItem, interactItem)) return;
      _set({ interactItem: _interactItem });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_interactItem]);

    useEffect(() => {
      if (isEqual(_anchorEl, anchorEl)) return;
      _set({ anchorEl: _anchorEl });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_anchorEl]);

    useEffect(() => {
      if (isEqual(_selectable, selectable)) return;
      _set({ selectable: _selectable });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_selectable]);

    return <></>;
  };

  const ListTable: FC<Omit<ICommonTableProps<T>, 'rows' | 'selectable' | 'loading'>> = (props) => {
    const { columns, ...otherProps } = props;

    const [data] = useStore((s) => s.data);
    const [isCheckAll] = useStore((s) => s.isCheckAll);
    const [isSelected] = useStore((s) => s.isSelected);
    const [checkAllItems] = useStore((s) => s.control?.checkAllItems);
    const [checkOneItem] = useStore((s) => s.control?.checkOneItem);
    const [fetchState] = useStore((s) => s.fetchState);

    const selectable = useMemo(() => {
      return {
        isCheckAll,
        onCheckAll: checkAllItems,
        onCheckRow: checkOneItem,
        isRowSelected: isSelected,
      };
    }, [isCheckAll, checkAllItems, checkOneItem, isSelected]);

    const loading = useMemo(() => {
      return fetchState === ERequestStatus.REQUESTING;
    }, [fetchState]);

    return <CommonTable {...otherProps} rows={data} columns={columns} loading={loading} selectable={selectable} />;
  };

  const ListPaging: FC<Omit<ICommonPaginationProps, 'pageIndex' | 'pageSize' | 'totalCount' | 'onChange'>> = (
    props,
  ) => {
    const [pageIndex] = useStore((s) => s.listState.pageIndex);
    const [pageSize] = useStore((s) => s.listState.pageSize);
    const [totalCount] = useStore((s) => s.listState.totalCount);
    const [updatePaging] = useStore((s) => s.control?.updatePaging);

    const handleChangePage = useCallback(
      (page: number) => {
        updatePaging?.(page, 10);
      },
      [updatePaging],
    );

    return (
      <CommonPagination
        {...props}
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalCount={totalCount}
        onChange={handleChangePage}
      />
    );
  };

  const ListProvider: FC<IUseListStateParams<T> & { children?: ReactNode }> = (props) => {
    const { children, ...useListStateParams } = props;
    return (
      <Provider>
        <ListInit {...useListStateParams} />
        {children}
      </Provider>
    );
  };

  const ActionCell: TBodyCellComponent<T> = (props) => {
    const { row, ...otherProps } = props;
    const [set] = useStore((s) => s.action?.set);

    const item = useMemo(() => {
      return row;
    }, [row]);

    const setAction = useCallback(
      (actionDetail: {
        action: string;
        item?: T | undefined;
        element?: any;
        keepAnchor?: boolean | undefined;
        keepInteract?: boolean | undefined;
      }) => {
        set?.(actionDetail);
      },
      [set],
    );

    const toggleAction: MouseEventHandler<HTMLButtonElement> = useCallback(
      (event) => {
        event?.stopPropagation?.();
        event?.preventDefault?.();
        if (!event?.target) return;
        if (!item) return;
        setAction({
          item,
          action: ACTION.MORE_ACTION,
          element: event.target,
        });
        return;
      },
      [item, setAction],
    );

    return (
      <TableCell {...otherProps}>
        {useMemo(() => {
          return (
            <IconButton onClick={toggleAction}>
              <MoreVertIcon />
            </IconButton>
          );
        }, [toggleAction])}
      </TableCell>
    );
  };

  const ItemAction: FC<Omit<MenuProps, 'anchorEl' | 'open' | 'onClose'>> = (props) => {
    const { children, ...otherProps } = props;
    const [anchorEl] = useStore((s) => s.anchorEl);
    const [interactItem] = useStore((s) => s.interactItem);
    const [clear] = useStore((s) => s.action?.clear);

    const anchor = useMemo(() => {
      return anchorEl;
    }, [anchorEl]);

    const open = useMemo(() => {
      return !!anchorEl && !!interactItem;
    }, [anchorEl, interactItem]);

    const clearAction = useCallback(() => {
      clear?.();
    }, [clear]);

    return (
      <Menu
        anchorEl={anchor}
        open={open}
        onClose={clearAction}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        {...otherProps}
      >
        {children}
      </Menu>
    );
  };

  return {
    AsyncListProvider: ListProvider,
    useAsyncList: useStore,
    useAsyncListControl: useListControl,
    useAsyncListAction: useListAction,
    AsyncListTable: ListTable,
    AsyncListPaging: ListPaging,
    ActionCell,
    ItemAction,
  };
}
export default createAsyncListContext;
