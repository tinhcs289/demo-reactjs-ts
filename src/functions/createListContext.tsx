import createFastContext from '@/functions/createFastContext';
import useListState from '@/hooks/useListState';
import { DEFAULT_DATA } from '@/hooks/useListState/constants';
import type {
  IUseListStateParams,
  IUseListStateReturnsAction,
  IUseListStateReturnsControl,
  IUseListStateReturnsState,
} from '@/hooks/useListState/_types';
import isEqual from 'lodash/isEqual';
import { FC, ReactNode, useEffect, useMemo } from 'react';

export function createListContext<T extends { [x: string]: any }>() {
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
    } = useListState(props);

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

  const ListProvider: FC<IUseListStateParams<T> & { children?: ReactNode }> = (props) => {
    const { children, ...useListStateParams } = props;
    return (
      <Provider>
        <ListInit {...useListStateParams} />
        {children}
      </Provider>
    );
  };

  return { ListProvider, useList: useStore, useListControl, useListAction };
}
export default createListContext;
