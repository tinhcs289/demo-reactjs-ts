import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import createFastContext from '@/functions/createFastContext';
import concatArray from '@/helpers/arrayHelpers/concatArray';
import get from 'lodash/get';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useMemo } from 'react';
type Obj = { [x: string]: any };
type NullableProps<T extends Obj = Obj> = { [P in keyof T]: T[P] | null };
export type RowData = Obj;
const ID = 'id';
const PAGE_INDEX = 1;
const PAGE_SIZE = 10;
export type SortDirect = 'DESC' | 'ASC';
export type Paging = { pageIndex: number; pageSize: number };
export type Sort = { sortBy: string; sortDirection: SortDirect };
export type QueryParams = Obj;
export type ListState = Paging & NullableProps<Sort> & { filter?: QueryParams; totalCount: number };
export type OnQueryArgs = Paging & NullableProps<Sort> & { filter?: QueryParams };
export type OnQueryReturns<T extends RowData = RowData> = { result: T[]; totalCount: number };
export type OnQueryCallback<T extends RowData = RowData> = (args: OnQueryArgs) => Promise<OnQueryReturns<T>>;
export type AsyncListConfig<T extends RowData> = {
  idField?: string;
  onQuery?: OnQueryCallback<T>;
  infinite?: boolean;
  defaultSelectable?: boolean;
  defaultPagination?: Partial<Paging & { totalCount: number }>;
  defaultSort?: Partial<Sort>;
  defaultExtendQueryParams?: QueryParams;
  fixedExtendQueryParams?: QueryParams;
  queryOnFirstLoad?: boolean;
};
export type AsyncListData<T extends RowData = RowData> = {
  idField: string;
  data: T[];
  dataInPage: T[];
  fetchStatus: EApiRequestStatus;
  isInfinite: boolean;
};
export type AsyncListInteract<T extends RowData = RowData> = {
  itemAction: string;
  interactItem: T | null;
  anchorEl: any;
};
export type AsyncListSelectability<T extends RowData = RowData> = {
  selectable: boolean;
  selectedItems: T[];
  selectedItemIds: any[];
  isCheckAll: boolean;
};
export type ResetCallback = () => void;
export type ReloadCallback = () => void;
export type UpdatePagingCallback = (page: number, size: number) => void;
export type UpdateSortCallback = (sortBy: string, sortDirection: SortDirect) => void;
export type UpdateFilterCallback = (fitler: QueryParams) => void;
export type AsyncListDataActions = {
  reset: ResetCallback;
  reload: ReloadCallback;
  updatePaging: UpdatePagingCallback;
  updateSort: UpdateSortCallback;
  updateFilter: UpdateFilterCallback;
};
export type AsyncListInteractAction<T extends RowData = RowData> = {
  action: string;
  item?: T;
  element?: any;
  keepAnchor?: boolean;
  keepInteract?: boolean;
};
export type AsyncListSetActionCallback<T extends RowData = RowData> = (
  args: AsyncListInteractAction<T>
) => void;
export type AsyncListClearActionCallback = () => void;
export type AsyncListInteractActions<T extends RowData = RowData> = {
  setAction: AsyncListSetActionCallback<T>;
  isAction: (action: string) => boolean;
  isItemInteractAction: (action: string) => boolean;
  isItemInteractWithAnchorAction: (action: string) => boolean;
  clearAction: AsyncListClearActionCallback;
};
export type AsyncListToggleSelectCallback = (isOn: boolean) => void;
export type AsyncListToggleClearSelectCallback = () => void;
export type AsyncListCheckOrUncheckItemCallback<T extends RowData = RowData> = (item: T) => void;
export type AsyncListCheckOrUncheckAllItemsCallback = (checked: boolean) => void;
export type RequestAction =
  | {
      type: 'data:reset';
    }
  | {
      type: 'data:reload';
    }
  | {
      type: 'data:paginate';
      payload: [page: number, size: number];
    }
  | {
      type: 'data:sort';
      payload: [sortBy: string, sortDirection: SortDirect];
    }
  | {
      type: 'data:filter';
      payload: QueryParams;
    };
export type SelectAction =
  | {
      type: 'select:all';
      payload: [check: boolean];
    }
  | {
      type: 'select:toggle';
      payload: [isOn: boolean];
    }
  | {
      type: 'select';
      payload: RowData;
    }
  | {
      type: 'select:clear';
    };
export type InteractAction =
  | {
      type: 'interact:set';
      payload: AsyncListInteractAction;
    }
  | {
      type: 'interact:clear';
    };
export type AsyncListDispatch = RequestAction | SelectAction | InteractAction | null;
export type AsyncListState<T extends RowData = RowData> = { dispatch: AsyncListDispatch } & ListState &
  AsyncListData<T> &
  AsyncListInteract<T> &
  AsyncListSelectability<T>;
export const DEFAULT_ASYNC_LIST: AsyncListState = {
  idField: ID,
  data: [],
  dataInPage: [],
  fetchStatus: EApiRequestStatus.NONE,
  isInfinite: false,
  totalCount: 0,
  pageIndex: PAGE_INDEX,
  pageSize: PAGE_SIZE,
  sortBy: null,
  sortDirection: null,
  filter: {},
  interactItem: null,
  anchorEl: null,
  itemAction: 'NONE',
  selectedItems: [],
  selectedItemIds: [],
  isCheckAll: false,
  selectable: true,
  dispatch: null,
};
type State<T extends RowData = RowData> = AsyncListState<T>;
type Props<T extends RowData = RowData> = AsyncListConfig<T>;
export default function createAsyncListContext<T extends RowData>(defaultState?: Partial<AsyncListState<T>>) {
  const {
    Provider,
    useGetter: useAsyncListGetter,
    useSetter: useAsyncListSetter,
    useDefaultPropInit,
  } = createFastContext<State<T>>({
    ...(DEFAULT_ASYNC_LIST as any),
    ...defaultState,
  });
  function ListRequestInit(
    props?: Pick<
      Props<T>,
      'defaultExtendQueryParams' | 'fixedExtendQueryParams' | 'onQuery' | 'queryOnFirstLoad' | 'infinite'
    >
  ) {
    const { onQuery, defaultExtendQueryParams, fixedExtendQueryParams, infinite, queryOnFirstLoad } =
      props || {};
    const isInfinite = useMemo(() => !!infinite, [infinite]);
    const firstLoadQuery = useMemo(() => !!queryOnFirstLoad, [queryOnFirstLoad]);
    const fixedFilter = useMemo(
      () => (fixedExtendQueryParams || {}) as QueryParams,
      [fixedExtendQueryParams]
    );
    const initFilter = useMemo(
      () => (defaultExtendQueryParams || {}) as QueryParams,
      [defaultExtendQueryParams]
    );
    const setState = useAsyncListSetter();
    const dispatch = useAsyncListGetter((s) => s.dispatch);
    const clearDispatch = useCallback(() => {
      setState({ dispatch: null });
    }, [setState]);
    const pageIndex = useAsyncListGetter((s) => s.pageIndex);
    const pageSize = useAsyncListGetter((s) => s.pageSize);
    const sortBy = useAsyncListGetter((s) => s.sortBy);
    const sortDirection = useAsyncListGetter((s) => s.sortDirection);
    const filter = useAsyncListGetter((s) => s?.filter);
    const data = useAsyncListGetter((s) => s.data);
    const getQueryArgs = useCallback(
      function getQueryArgs(payload?: Partial<OnQueryArgs>) {
        const query: OnQueryArgs = {
          pageIndex: payload?.pageIndex || pageIndex,
          pageSize: payload?.pageSize || pageSize,
          sortBy: payload?.sortBy || sortBy || null,
          sortDirection: payload?.sortDirection || sortDirection || null,
          filter: { ...initFilter, ...filter, ...payload?.filter, ...fixedFilter },
        };
        return query;
      },
      [fixedFilter, initFilter, pageIndex, pageSize, filter, sortBy, sortDirection]
    );
    const fetchData = useCallback(
      async function fetchData(payload?: Partial<ListState>) {
        if (!onQuery) return;
        let [result, totalCount]: [T[], number] = [[], 0];
        setState({ fetchStatus: EApiRequestStatus.REQUESTING });
        const queryArgs = getQueryArgs(payload);
        try {
          const response = await onQuery(queryArgs);
          result = Array.isArray(response?.result) ? response.result : [];
          totalCount = Number.isInteger(response?.totalCount) ? response.totalCount : 0;
          setState({ dataInPage: result });
          if (isInfinite) {
            const newData = concatArray(data, result);
            setState({ data: newData });
          }
          setState({
            totalCount: totalCount,
            pageIndex: queryArgs.pageIndex,
            pageSize: queryArgs.pageSize,
            sortBy: queryArgs.sortBy,
            sortDirection: queryArgs.sortDirection,
            filter: queryArgs.filter,
          });
          setState({ fetchStatus: EApiRequestStatus.REQUESTSUCCESS });
        } catch (error) {
          console.log(error);
          setState({ fetchStatus: EApiRequestStatus.REQUESTFAIL });
        } finally {
          setState({ fetchStatus: EApiRequestStatus.NONE });
        }
      },
      [onQuery, getQueryArgs, isInfinite, data, setState]
    );
    useEffect(() => {
      if (!firstLoadQuery) return;
      fetchData({ pageIndex: 1 });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const reload = useCallback(() => {
      fetchData();
    }, [fetchData]);
    const updateFilter = useCallback(
      (newFilter: QueryParams) => {
        fetchData({ filter: newFilter, pageIndex: 1 });
        return;
      },
      [fetchData]
    );
    const updatePaging = useCallback(
      (page: number, size: number) => {
        fetchData({ pageIndex: page, pageSize: size });
        return;
      },
      [fetchData]
    );
    const updateSort = useCallback(
      (sortBy: string, sortDirection: SortDirect) => {
        if (!sortBy) return;
        fetchData({ sortBy, sortDirection, pageIndex: 1 });
        return;
      },
      [fetchData]
    );
    useEffect(() => {
      if (!dispatch) return;
      switch (dispatch.type) {
        case 'data:paginate':
          clearDispatch();
          updatePaging(...dispatch.payload);
          break;
        case 'data:sort':
          clearDispatch();
          updateSort(...dispatch.payload);
          break;
        case 'data:filter':
          clearDispatch();
          updateFilter(dispatch.payload);
          break;
        case 'data:reset':
          clearDispatch();
          reload();
          break;
        case 'data:reload':
          clearDispatch();
          reload();
          break;
        default:
          clearDispatch();
          return;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, clearDispatch]);
    return <></>;
  }
  function ListSelectableInit(props: Pick<Props<T>, 'idField'>) {
    const { idField = ID } = props;
    const getId = useCallback((item?: T) => (!idField ? null : get(item, idField)), [idField]);
    const setState = useAsyncListSetter();
    const isCurrentCheckAll = useAsyncListGetter((s) => s.isCheckAll);
    const dataInPage = useAsyncListGetter((s) => s.dataInPage);
    const selectedItems = useAsyncListGetter((s) => s.selectedItems);
    const selectedItemIds = useAsyncListGetter((s) => s.selectedItemIds);
    const dispatch = useAsyncListGetter((s) => s.dispatch);
    const clearDispatch = useCallback(() => {
      setState({ dispatch: null });
    }, [setState]);
    const isCheckAll = useCallback(
      (checks: T[] = [], pageData: T[] = []) => {
        if (!Array.isArray(checks) || checks.length === 0) return false;
        if (!Array.isArray(pageData) || pageData.length === 0) return false;
        if (checks.length < pageData.length) return false;
        let is = true,
          i = 0;
        while (is && i < pageData.length) {
          const item = pageData[i];
          if (checks.findIndex((check) => getId(check) === getId(item)) < 0) is = false;
          else i++;
        }
        return is;
      },
      [getId]
    );
    const checkAllItems = useCallback(
      (checked: boolean = true) => {
        setState({ isCheckAll: checked });
        if (!Array.isArray(dataInPage) || dataInPage.length === 0) return;
        if (checked) {
          const selecteds = concatArray(
            selectedItems,
            dataInPage.filter((i) => {
              const id = getId(i);
              if (!id) return false;
              return selectedItems.findIndex((s) => getId(s) === id) < 0;
            })
          );
          setState({
            selectedItems: selecteds,
            selectedItemIds: selecteds.map((i) => getId(i)),
          });
        } else {
          const listUncheckIds = dataInPage.map((i) => getId(i));
          const selecteds = selectedItems.filter((i) => !listUncheckIds.includes(getId(i)));
          setState({
            selectedItems: selecteds,
            selectedItemIds: selecteds.map((i) => getId(i)),
          });
        }
      },
      [getId, selectedItems, dataInPage, setState]
    );
    const checkOneItem = useCallback(
      (item: T) => {
        if (!item) return;
        const id = getId(item);
        if (!id) return;
        const hasCheckedBefore = selectedItemIds.includes(id);
        const shouldChecked = !hasCheckedBefore;
        if (shouldChecked) {
          const selecteds = concatArray(selectedItems, [item]);
          const shouldCheckAll = isCheckAll(selecteds, dataInPage);
          setState({
            isCheckAll: shouldCheckAll,
            selectedItems: selecteds,
            selectedItemIds: selecteds.map((i) => getId(i)),
          });
        } else {
          const selecteds = selectedItems.filter((i) => getId(i) !== id);
          const shouldCheckAll = isCheckAll(selecteds, dataInPage);
          setState({
            isCheckAll: shouldCheckAll,
            selectedItems: selecteds,
            selectedItemIds: selecteds.map((i) => getId(i)),
          });
        }
      },
      [getId, selectedItems, selectedItemIds, dataInPage, isCheckAll, setState]
    );
    const toggleSelectable = useCallback(
      (isOn: boolean) => {
        setState({ selectable: isOn });
        if (isOn) return;
        setState({
          isCheckAll: false,
          selectedItemIds: [],
          selectedItems: [],
        });
      },
      [setState]
    );
    const clearSelectItems = useCallback(() => {
      setState({
        isCheckAll: false,
        selectedItemIds: [],
        selectedItems: [],
      });
    }, [setState]);
    useEffect(() => {
      if (!dispatch) return;
      switch (dispatch.type) {
        case 'select':
          clearDispatch();
          checkOneItem(dispatch.payload as any);
          break;
        case 'select:all':
          clearDispatch();
          checkAllItems(...dispatch.payload);
          break;
        case 'select:clear':
          clearDispatch();
          clearSelectItems();
          break;
        case 'select:toggle':
          clearDispatch();
          toggleSelectable(...dispatch.payload);
          break;
        default:
          clearDispatch();
          return;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, clearDispatch]);
    useEffect(() => {
      if (!Number.isInteger(dataInPage?.length)) {
        setState({ isCheckAll: false });
        return;
      }
      if (dataInPage?.length === 0) {
        setState({ isCheckAll: false });
        return;
      }
      const shouldCheckAll = isCheckAll(selectedItems, dataInPage);
      if (shouldCheckAll && !isCurrentCheckAll) setState({ isCheckAll: true });
      if (!shouldCheckAll && isCurrentCheckAll) setState({ isCheckAll: false });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataInPage]);
    return <></>;
  }
  function ListDefaultPropInit(
    props: Pick<Props<T>, 'defaultSelectable' | 'defaultPagination' | 'defaultSort'>
  ) {
    const { defaultSelectable, defaultPagination, defaultSort } = props || {};
    useDefaultPropInit('totalCount', defaultPagination?.totalCount);
    useDefaultPropInit('pageIndex', defaultPagination?.pageIndex);
    useDefaultPropInit('pageSize', defaultPagination?.pageSize);
    useDefaultPropInit('sortBy', defaultSort?.sortBy);
    useDefaultPropInit('sortDirection', defaultSort?.sortDirection);
    useDefaultPropInit('selectable', defaultSelectable);
    return <></>;
  }
  function ListInteractInit() {
    const setState = useAsyncListSetter();
    const dispatch = useAsyncListGetter((s) => s.dispatch);
    const clearDispatch = useCallback(() => {
      setState({ dispatch: null });
    }, [setState]);
    const setItemActionDetail = useCallback(
      (detail: AsyncListInteractAction) => {
        const { action, item, element, keepAnchor, keepInteract } = detail;
        if (!action) return;
        setState({ itemAction: action });
        if (!!item) setState({ interactItem: item as any });
        else {
          if (!keepInteract) setState({ interactItem: null });
        }
        if (!!element) setState({ anchorEl: element });
        else {
          if (!keepAnchor) setState({ anchorEl: null });
        }
        return;
      },
      [setState]
    );
    const clearItemAction = useCallback(() => {
      setState({
        itemAction: 'NONE',
        interactItem: null,
        anchorEl: null,
      });
    }, [setState]);
    useEffect(() => {
      if (!dispatch) return;
      switch (dispatch.type) {
        case 'interact:set':
          clearDispatch();
          setItemActionDetail(dispatch.payload);
          break;
        case 'interact:clear':
          clearDispatch();
          clearItemAction();
          break;
        default:
          clearDispatch();
          return;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, clearDispatch]);
    return <></>;
  }
  function useAsyncListAction() {
    const setState = useAsyncListSetter();
    const updatePaging: UpdatePagingCallback = useCallback(
      (page, size) => {
        setState({ dispatch: { type: 'data:paginate', payload: [page, size] } });
      },
      [setState]
    );
    const updateSort: UpdateSortCallback = useCallback(
      (by, dir) => {
        setState({ dispatch: { type: 'data:sort', payload: [by, dir] } });
      },
      [setState]
    );
    const updateFilter: UpdateFilterCallback = useCallback(
      (payload) => {
        setState({ dispatch: { type: 'data:filter', payload } });
      },
      [setState]
    );
    const reload: ReloadCallback = useCallback(() => {
      setState({ dispatch: { type: 'data:reload' } });
    }, [setState]);
    const reset: ResetCallback = useCallback(() => {
      setState({ dispatch: { type: 'data:reset' } });
    }, [setState]);
    const setAction: AsyncListSetActionCallback<T> = useCallback(
      (payload) => {
        setState({ dispatch: { type: 'interact:set', payload } });
      },
      [setState]
    );
    const clearAction: AsyncListClearActionCallback = useCallback(() => {
      setState({ dispatch: { type: 'interact:clear' } });
    }, [setState]);
    const check: AsyncListCheckOrUncheckItemCallback<T> = useCallback(
      (payload) => {
        setState({ dispatch: { type: 'select', payload } });
      },
      [setState]
    );
    const checkAll: AsyncListCheckOrUncheckAllItemsCallback = useCallback(
      (checked) => {
        setState({ dispatch: { type: 'select:all', payload: [checked] } });
      },
      [setState]
    );
    const clearSelect: AsyncListToggleClearSelectCallback = useCallback(() => {
      setState({ dispatch: { type: 'select:clear' } });
    }, [setState]);
    const toggleSelectable: AsyncListToggleSelectCallback = useCallback(
      (isOn) => {
        setState({ dispatch: { type: 'select:toggle', payload: [isOn] } });
      },
      [setState]
    );
    return {
      updatePaging,
      updateSort,
      updateFilter,
      reload,
      reset,
      setAction,
      clearAction,
      check,
      checkAll,
      clearSelect,
      toggleSelectable,
    };
  }
  function AsyncListProvider(props: Props<T> & { children?: ReactNode }) {
    const {
      idField,
      children,
      defaultSelectable,
      defaultPagination,
      defaultSort,
      onQuery,
      queryOnFirstLoad,
      fixedExtendQueryParams,
      defaultExtendQueryParams,
      infinite,
    } = props || {};
    const $PropInit = useMemo(
      () => (
        <ListDefaultPropInit
          defaultSelectable={defaultSelectable}
          defaultPagination={defaultPagination}
          defaultSort={defaultSort}
        />
      ),
      [defaultSelectable, defaultPagination, defaultSort]
    );
    const $RequestInit = useMemo(
      () => (
        <ListRequestInit
          onQuery={onQuery}
          queryOnFirstLoad={queryOnFirstLoad}
          fixedExtendQueryParams={fixedExtendQueryParams}
          defaultExtendQueryParams={defaultExtendQueryParams}
          infinite={infinite}
        />
      ),
      [onQuery, queryOnFirstLoad, defaultExtendQueryParams, fixedExtendQueryParams, infinite]
    );
    const $InteractInit = useMemo(() => <ListInteractInit />, []);
    const $SelectableInit = useMemo(() => <ListSelectableInit idField={idField} />, [idField]);
    return (
      <Provider>
        {$PropInit}
        {$RequestInit}
        {$InteractInit}
        {$SelectableInit}
        {children}
      </Provider>
    );
  }
  function useAsyncListInteract() {
    const itemAction = useAsyncListGetter((s) => s?.itemAction);
    const interactItem = useAsyncListGetter((s) => s?.interactItem);
    const anchorEl = useAsyncListGetter((s) => s?.anchorEl);
    const isAction = useCallback((key: string) => key === itemAction, [itemAction]);
    const isActionWithInteract = useCallback(
      (key: string) => key === itemAction && !!interactItem,
      [interactItem, itemAction]
    );
    const isActionWithInteractAndAncholElement = useCallback(
      (key: string) => key === itemAction && !!interactItem && !!anchorEl,
      [itemAction, interactItem, anchorEl]
    );
    return {
      isAction,
      isActionWithInteract,
      isActionWithInteractAndAncholElement,
      itemAction,
      interactItem,
      anchorEl,
    };
  }
  return {
    AsyncListProvider,
    useAsyncListAction,
    useAsyncListGetter,
    useAsyncListSetter,
    useAsyncListInteract,
  };
}
export function isValidResult<T extends RowData>(data?: OnQueryReturns<T>): boolean {
  return (
    !!data &&
    Number.isInteger(data.totalCount) &&
    data.totalCount > 0 &&
    Array.isArray(data.result) &&
    data.result.length > 0
  );
}
