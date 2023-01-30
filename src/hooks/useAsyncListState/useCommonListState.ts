import { ACTION } from './constants';
import useAsyncListState from './useAsyncListState';
import type { IUseListStateParams, IUseListStateReturns } from './_types';
import { useCallback } from 'react';

const useCommonListState = <T extends { [x: string]: any }>(
  args?: IUseListStateParams<T>
): IUseListStateReturns<T> => {
  const returns = useAsyncListState(args);

  const isCreate = useCallback(
    () => {
      return returns?.action?.is?.(ACTION.CREATE) || false;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [returns?.action?.is]
  );

  const openCreation = useCallback(
    (detail: { item?: T; keepAnchor?: boolean; keepInteract?: boolean }) => {
      const { item, keepAnchor, keepInteract } = detail;
      returns?.action?.set?.({ action: ACTION.CREATE, item, keepAnchor, keepInteract });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [returns?.action?.set]
  );

  const isDelete = useCallback(
    () => {
      return (returns?.action?.is?.(ACTION.CREATE) || false) && !!returns?.state?.interactItem;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [returns?.action?.is, returns?.state?.interactItem]
  );

  const openDeleteConfirm = useCallback(
    (detail: { item: T; keepAnchor?: boolean }) => {
      if (!detail?.item) return;
      const { item, keepAnchor } = detail;
      returns?.action?.set?.({ action: ACTION.DELETE, item, keepAnchor });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [returns?.action?.set]
  );

  const isDetail = useCallback(
    () => {
      return (returns?.action?.is?.(ACTION.OPEN_DETAIL) || false) && !!returns?.state?.interactItem;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [returns?.action?.is, returns?.state?.interactItem]
  );

  const openDetail = useCallback(
    (detail: { item: T; keepAnchor?: boolean; keepInteract?: boolean }) => {
      if (!detail?.item) return;
      const { item, keepAnchor, keepInteract } = detail;
      returns?.action?.set?.({ action: ACTION.OPEN_DETAIL, item, keepAnchor, keepInteract });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [returns?.action?.set]
  );

  const isMoreAction = useCallback(
    () => {
      return (
        (returns?.action?.is?.(ACTION.MORE_ACTION) || false) &&
        !!returns?.state?.interactItem &&
        !!returns?.state?.anchorEl
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [returns?.action?.is, returns?.state?.interactItem, returns?.state?.anchorEl]
  );

  const openMoreActionMenu = useCallback(
    (detail: { item?: T; element?: any; keepInteract?: boolean; keepAnchor?: boolean }) => {
      const { item, element, keepAnchor, keepInteract } = detail;
      returns?.action?.set?.({ action: ACTION.MORE_ACTION, item, element, keepAnchor, keepInteract });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [returns?.action?.set]
  );

  return {
    ...returns,
    common: {
      //
      isCreate,
      openCreation,
      //
      isDelete,
      openDeleteConfirm,
      //
      isDetail,
      openDetail,
      //
      isMoreAction,
      openMoreActionMenu,
    },
  };
};
export default useCommonListState;
