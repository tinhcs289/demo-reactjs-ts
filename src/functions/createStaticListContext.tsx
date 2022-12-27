import createFastContext from '@/functions/createFastContext';
import useStaticListState from '@/hooks/useStaticListState';
import { DEFAULT_DATA } from '@/hooks/useStaticListState/constants';
import type {
  IUseListStateReturnsAction,
  IUseListStateReturnsControl,
  IUseStaticListStateParams,
  IUseStaticListStateReturnsState,
} from '@/hooks/useStaticListState/_types';
import type { TAny } from '@/_types/TAny';
import isEqual from 'lodash/isEqual';
import type { FC, ReactNode } from 'react';
import { useEffect } from 'react';

export type TStaticList<T extends TAny> = Omit<
  IUseStaticListStateReturnsState<T>,
  ' isShowMultiAction' | 'isSelected'
> & {
  isSelected?: (item: T) => boolean;
  isShowMultiAction?: () => boolean;
  control?: IUseListStateReturnsControl<T>;
  action?: IUseListStateReturnsAction<T>;
};
export function createStaticListContext<T extends TAny>() {
  const { Provider, useStore: useStaticList } = createFastContext<TStaticList<T>>(DEFAULT_DATA as any);

  const ListInit: FC<IUseStaticListStateParams<T>> = (props) => {
    const {
      state: {
        data: _data,
        listState: _listState,
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
    } = useStaticListState(props);

    const [data, _set] = useStaticList((s) => s.data);
    const [listState] = useStaticList((s) => s.listState);
    const [selectedItems] = useStaticList((s) => s.selectedItems);
    const [isCheckAll] = useStaticList((s) => s.isCheckAll);
    const [interactItem] = useStaticList((s) => s.interactItem);
    const [anchorEl] = useStaticList((s) => s.anchorEl);
    const [selectable] = useStaticList((s) => s.selectable);

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

  const StaticListProvider: FC<IUseStaticListStateParams<T> & { children?: ReactNode }> = (props) => {
    const { children, ...useListStateParams } = props;
    return (
      <Provider>
        <ListInit {...useListStateParams} />
        {children}
      </Provider>
    );
  };

  return {
    StaticListProvider,
    useStaticList,
  };
}
export default createStaticListContext;
