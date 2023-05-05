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
export type OnQueryArgs<T extends RowData = RowData> = { data: T[] } & Paging &
  NullableProps<Sort> & { filter?: QueryParams };
export type OnQueryReturns<T extends RowData = RowData> = { result: T[]; totalCount: number };
export type OnQueryCallback<T extends RowData = RowData> = (args: OnQueryArgs<T>) => OnQueryReturns<T>;
export type StaticListConfig<T extends RowData> = {
  data: T[];
  idField?: string;
  onQuery?: OnQueryCallback<T>;
  defaultSelectable?: boolean;
  defaultPagination?: Partial<Paging & { totalCount: number }>;
  defaultSort?: Partial<Sort>;
  defaultExtendQueryParams?: QueryParams;
  fixedExtendQueryParams?: QueryParams;
};
export type StaticListData<T extends RowData = RowData> = {
  idField: string;
  data: T[];
  dataInPage: T[];
};
export type StaticListInteract<T extends RowData = RowData> = {
  itemAction: string;
  interactItem: T | null;
  anchorEl: any;
};
export type StaticListSelectability<T extends RowData = RowData> = {
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
export type StaticListDataActions = {
  reset: ResetCallback;
  reload: ReloadCallback;
  updatePaging: UpdatePagingCallback;
  updateSort: UpdateSortCallback;
  updateFilter: UpdateFilterCallback;
};
export type StaticListInteractAction<T extends RowData = RowData> = {
  action: string;
  item?: T;
  element?: any;
  keepAnchor?: boolean;
  keepInteract?: boolean;
};
export type StaticListSetActionCallback<T extends RowData = RowData> = (
  args: StaticListInteractAction<T>
) => void;
export type StaticListClearActionCallback = () => void;
export type StaticListInteractActions<T extends RowData = RowData> = {
  setAction: StaticListSetActionCallback<T>;
  isAction: (action: string) => boolean;
  isItemInteractAction: (action: string) => boolean;
  isItemInteractWithAnchorAction: (action: string) => boolean;
  clearAction: StaticListClearActionCallback;
};
export type StaticListToggleSelectCallback = (isOn: boolean) => void;
export type StaticListToggleClearSelectCallback = () => void;
export type StaticListCheckOrUncheckItemCallback<T extends RowData = RowData> = (item: T) => void;
export type StaticListCheckOrUncheckAllItemsCallback = (checked: boolean) => void;
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
      payload: StaticListInteractAction;
    }
  | {
      type: 'interact:clear';
    };
export type StaticListDispatch = RequestAction | SelectAction | InteractAction | null;
export type StaticListState<T extends RowData = RowData> = { dispatch: StaticListDispatch } & ListState &
  StaticListData<T> &
  StaticListInteract<T> &
  StaticListSelectability<T>;
export const DEFAULT_ASYNC_LIST: StaticListState = {
  idField: ID,
  data: [],
  dataInPage: [],
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
type State<T extends RowData = RowData> = StaticListState<T>;
type Props<T extends RowData = RowData> = StaticListConfig<T>;
export default function createStaticListContext<T extends RowData>(
  defaultState?: Partial<StaticListState<T>>
) {
  const {
    Provider,
    useGetter: useStaticListGetter,
    useSetter: useStaticListSetter,
    useDefaultPropInit,
  } = createFastContext<State<T>>({
    ...(DEFAULT_ASYNC_LIST as any),
    ...defaultState,
  });
  function ListRequestInit(
    props?: Pick<Props<T>, 'defaultExtendQueryParams' | 'fixedExtendQueryParams' | 'onQuery'>
  ) {
    const { onQuery, defaultExtendQueryParams, fixedExtendQueryParams } = props || {};
    const fixedFilter = useMemo(
      () => (fixedExtendQueryParams || {}) as QueryParams,
      [fixedExtendQueryParams]
    );
    const initFilter = useMemo(
      () => (defaultExtendQueryParams || {}) as QueryParams,
      [defaultExtendQueryParams]
    );
    const setState = useStaticListSetter();
    const dispatch = useStaticListGetter((s) => s.dispatch);
    const clearDispatch = useCallback(() => {
      setState({ dispatch: null });
    }, [setState]);
    const pageIndex = useStaticListGetter((s) => s.pageIndex);
    const pageSize = useStaticListGetter((s) => s.pageSize);
    const sortBy = useStaticListGetter((s) => s.sortBy);
    const sortDirection = useStaticListGetter((s) => s.sortDirection);
    const filter = useStaticListGetter((s) => s?.filter);
    const data = useStaticListGetter((s) => s.data);
    const getQueryArgs = useCallback(
      function getQueryArgs(payload?: Partial<OnQueryArgs>) {
        const query: OnQueryArgs = {
          data: data,
          pageIndex: payload?.pageIndex || pageIndex,
          pageSize: payload?.pageSize || pageSize,
          sortBy: payload?.sortBy || sortBy || null,
          sortDirection: payload?.sortDirection || sortDirection || null,
          filter: { ...initFilter, ...filter, ...payload?.filter, ...fixedFilter },
        };
        return query;
      },
      [fixedFilter, initFilter, pageIndex, pageSize, filter, sortBy, sortDirection, data]
    );
    const queryData = useCallback(
      function queryData(payload?: Partial<ListState>) {
        if (!onQuery) return;
        let [result, totalCount]: [T[], number] = [[], 0];
        const queryArgs = getQueryArgs(payload);
        try {
          const response = onQuery({ ...queryArgs, data });
          result = Array.isArray(response?.result) ? response.result : [];
          totalCount = Number.isInteger(response?.totalCount) ? response.totalCount : 0;
          setState({ dataInPage: result });
          setState({
            totalCount: totalCount,
            pageIndex: queryArgs.pageIndex,
            pageSize: queryArgs.pageSize,
            sortBy: queryArgs.sortBy,
            sortDirection: queryArgs.sortDirection,
            filter: queryArgs.filter,
          });
        } catch (error) {
          console.log(error);
        }
      },
      [onQuery, getQueryArgs, data, setState]
    );
    const reload = useCallback(() => {
      queryData();
    }, [queryData]);
    const updateFilter = useCallback(
      (newFilter: QueryParams) => {
        queryData({ filter: newFilter, pageIndex: 1 });
        return;
      },
      [queryData]
    );
    const updatePaging = useCallback(
      (page: number, size: number) => {
        queryData({ pageIndex: page, pageSize: size });
        return;
      },
      [queryData]
    );
    const updateSort = useCallback(
      (sortBy: string, sortDirection: SortDirect) => {
        if (!sortBy) return;
        queryData({ sortBy, sortDirection, pageIndex: 1 });
        return;
      },
      [queryData]
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
    const setState = useStaticListSetter();
    const isCurrentCheckAll = useStaticListGetter((s) => s.isCheckAll);
    const dataInPage = useStaticListGetter((s) => s.dataInPage);
    const selectedItems = useStaticListGetter((s) => s.selectedItems);
    const selectedItemIds = useStaticListGetter((s) => s.selectedItemIds);
    const dispatch = useStaticListGetter((s) => s.dispatch);
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
    props: Pick<Props<T>, 'defaultSelectable' | 'defaultPagination' | 'defaultSort' | 'data'>
  ) {
    const { defaultSelectable, defaultPagination, defaultSort, data } = props || {};
    useDefaultPropInit('totalCount', defaultPagination?.totalCount);
    useDefaultPropInit('pageIndex', defaultPagination?.pageIndex);
    useDefaultPropInit('pageSize', defaultPagination?.pageSize);
    useDefaultPropInit('sortBy', defaultSort?.sortBy);
    useDefaultPropInit('sortDirection', defaultSort?.sortDirection);
    useDefaultPropInit('selectable', defaultSelectable);
    useDefaultPropInit('data', data);
    return <></>;
  }
  function ListInteractInit() {
    const setState = useStaticListSetter();
    const dispatch = useStaticListGetter((s) => s.dispatch);
    const clearDispatch = useCallback(() => {
      setState({ dispatch: null });
    }, [setState]);
    const setItemActionDetail = useCallback(
      (detail: StaticListInteractAction) => {
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
  function useStaticListAction() {
    const setState = useStaticListSetter();
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
    const setAction: StaticListSetActionCallback<T> = useCallback(
      (payload) => {
        setState({ dispatch: { type: 'interact:set', payload } });
      },
      [setState]
    );
    const clearAction: StaticListClearActionCallback = useCallback(() => {
      setState({ dispatch: { type: 'interact:clear' } });
    }, [setState]);
    const check: StaticListCheckOrUncheckItemCallback<T> = useCallback(
      (payload) => {
        setState({ dispatch: { type: 'select', payload } });
      },
      [setState]
    );
    const checkAll: StaticListCheckOrUncheckAllItemsCallback = useCallback(
      (checked) => {
        setState({ dispatch: { type: 'select:all', payload: [checked] } });
      },
      [setState]
    );
    const clearSelect: StaticListToggleClearSelectCallback = useCallback(() => {
      setState({ dispatch: { type: 'select:clear' } });
    }, [setState]);
    const toggleSelectable: StaticListToggleSelectCallback = useCallback(
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
  function StaticListProvider(props: Props<T> & { children?: ReactNode }) {
    const {
      idField,
      children,
      defaultSelectable,
      defaultPagination,
      defaultSort,
      onQuery,
      data,
      fixedExtendQueryParams,
      defaultExtendQueryParams,
    } = props || {};
    const $PropInit = useMemo(
      () => (
        <ListDefaultPropInit
          data={data}
          defaultSelectable={defaultSelectable}
          defaultPagination={defaultPagination}
          defaultSort={defaultSort}
        />
      ),
      [defaultSelectable, defaultPagination, defaultSort, data]
    );
    const $RequestInit = useMemo(
      () => (
        <ListRequestInit
          onQuery={onQuery}
          fixedExtendQueryParams={fixedExtendQueryParams}
          defaultExtendQueryParams={defaultExtendQueryParams}
        />
      ),
      [onQuery, defaultExtendQueryParams, fixedExtendQueryParams]
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
  function useStaticListInteract() {
    const itemAction = useStaticListGetter((s) => s?.itemAction);
    const interactItem = useStaticListGetter((s) => s?.interactItem);
    const anchorEl = useStaticListGetter((s) => s?.anchorEl);
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
    StaticListProvider,
    useStaticListAction,
    useStaticListGetter,
    useStaticListSetter,
    useStaticListInteract,
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
