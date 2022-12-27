import createFastContext from '@/functions/createFastContext';
import useAsyncListState from '@/hooks/useAsyncListState';
import { DEFAULT_DATA } from '@/hooks/useAsyncListState/constants';
import type {
  IUseListStateParams,
  IUseListStateReturnsAction,
  IUseListStateReturnsControl,
  IUseListStateReturnsState,
} from '@/hooks/useAsyncListState/_types';
import type { TAny } from '@/_types/TAny';
import isEqual from 'lodash/isEqual';
import type { FC, ReactNode } from 'react';
import { useEffect } from 'react';

export type TAsyncList<T extends TAny> = Omit<IUseListStateReturnsState<T>, ' isShowMultiAction' | 'isSelected'> & {
  isSelected?: (item: T) => boolean;
  isShowMultiAction?: () => boolean;
  control?: IUseListStateReturnsControl<T>;
  action?: IUseListStateReturnsAction<T>;
};
export function createAsyncListContext<T extends TAny>() {
  const { Provider, useStore: useAsyncList } = createFastContext<TAsyncList<T>>(DEFAULT_DATA as any);

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

    const [data, _set] = useAsyncList((s) => s.data);
    const [listState] = useAsyncList((s) => s.listState);
    const [fetchState] = useAsyncList((s) => s.fetchState);
    const [selectedItems] = useAsyncList((s) => s.selectedItems);
    const [isCheckAll] = useAsyncList((s) => s.isCheckAll);
    const [interactItem] = useAsyncList((s) => s.interactItem);
    const [anchorEl] = useAsyncList((s) => s.anchorEl);
    const [selectable] = useAsyncList((s) => s.selectable);

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

  const AsyncListProvider: FC<IUseListStateParams<T> & { children?: ReactNode }> = (props) => {
    const { children, ...useListStateParams } = props;
    return (
      <Provider>
        <ListInit {...useListStateParams} />
        {children}
      </Provider>
    );
  };

  return { AsyncListProvider, useAsyncList };
}
export default createAsyncListContext;
