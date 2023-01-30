import { ACTION } from './constants';
import useListState from './useStaticListState';
import type { IUseStaticListStateParams, IUseStaticListStateReturns } from './_types';

const useCommonStaticListState = <T extends { [x: string]: any }>(
  args?: IUseStaticListStateParams<T>
): IUseStaticListStateReturns<T> => {
  const returns = useListState(args);

  return {
    ...returns,
    common: {
      //
      isCreate: () => returns.action.is(ACTION.CREATE),
      openCreation: (detail: { item?: T; keepAnchor?: boolean; keepInteract?: boolean }) => {
        const { item, keepAnchor, keepInteract } = detail;
        returns.action.set({ action: ACTION.CREATE, item, keepAnchor, keepInteract });
      },
      //
      isDelete: () => returns.action.is(ACTION.DELETE) && !!returns.state.interactItem,
      openDeleteConfirm: (detail: { item: T; keepAnchor?: boolean }) => {
        const { item, keepAnchor } = detail;
        if (!!item) {
          returns.action.set({ action: ACTION.DELETE, item, keepAnchor });
        }
      },
      //
      isDetail: () => returns.action.is(ACTION.OPEN_DETAIL) && !!returns.state.interactItem,
      openDetail: (detail: { item: T; keepAnchor?: boolean; keepInteract?: boolean }) => {
        const { item, keepAnchor, keepInteract } = detail;
        if (!!item) {
          returns.action.set({ action: ACTION.OPEN_DETAIL, item, keepAnchor, keepInteract });
        }
      },
      //
      isMoreAction: () =>
        returns.action.is(ACTION.MORE_ACTION) && !!returns.state.interactItem && !!returns.state.anchorEl,
      openMoreActionMenu: (detail: {
        item?: T;
        element?: any;
        keepInteract?: boolean;
        keepAnchor?: boolean;
      }) => {
        const { item, element, keepAnchor, keepInteract } = detail;
        returns.action.set({ action: ACTION.MORE_ACTION, item, element, keepAnchor, keepInteract });
      },
    },
  };
};
export default useCommonStaticListState;
