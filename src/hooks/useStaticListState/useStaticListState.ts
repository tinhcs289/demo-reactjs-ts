import paginate from '@/helpers/arrayHelpers/paginate';
import cloneDeep from 'lodash/cloneDeep';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ACTION, DESC, PAGE_INDEX, PAGE_SIZE } from './constants';
import type {
  IUseStaticListStateParams,
  IUseStaticListStateReturns,
  TListState,
  TOnQueryArgs,
  TQueryExtendParams,
  TSortDirect,
} from './_types';

function useStaticListState<T extends { [x: string]: any }>(
  args?: IUseStaticListStateParams<T>,
): IUseStaticListStateReturns<T> {
  const {
    source,
    defaultSelectable,
    defaultPagination,
    defaultSort,
    defaultExtendQueryParams,
    fixedExtendQueryParams,
    onQueryLocaly,
  } = args || {};

  const memoSource = useMemo(() => {
    return Array.isArray(source) && source.length > 0 ? source : [];
  }, [source]);

  const __getid = useCallback(
    (item?: T) => (!item ? null : typeof args?.idField !== 'string' ? item['id'] : item[args.idField]),
    [args?.idField],
  );

  const dfPaging = useMemo(() => {
    return {
      totalCount: defaultPagination?.totalCount || memoSource.length,
      pageIndex: defaultPagination?.pageIndex || PAGE_INDEX,
      pageSize: defaultPagination?.pageIndex || PAGE_SIZE,
    };
  }, [defaultPagination, memoSource.length]);

  const dfSort = useMemo(() => {
    return {
      sortBy: defaultSort?.sortBy,
      sortDirection: defaultSort?.sortDirection,
    };
  }, [defaultSort]);

  const { filter: dfFilter, shouldAppendFilter: __appendFilter } = useMemo(() => {
    const shouldAppendFilter =
      (!!defaultExtendQueryParams && Object.keys(defaultExtendQueryParams).length > 0) ||
      (!!fixedExtendQueryParams && Object.keys(fixedExtendQueryParams).length > 0);

    let filter = {};

    if (shouldAppendFilter)
      filter = {
        moreFilter: {
          ...defaultExtendQueryParams,
          ...fixedExtendQueryParams,
        },
      };

    return { filter, shouldAppendFilter };
  }, [defaultExtendQueryParams, fixedExtendQueryParams]);

  const dfState = useMemo(() => {
    return { ...dfPaging, ...dfSort, ...dfFilter } as TListState;
  }, [dfPaging, dfSort, dfFilter]);

  const getQueryArgs = useCallback(
    (state: TListState, newFilter?: TQueryExtendParams) => {
      return {
        pagination: {
          pageIndex: state?.pageIndex || dfPaging.pageIndex,
          pageSize: state?.pageSize || dfPaging.pageSize,
        },
        sort: !state?.sortBy
          ? undefined
          : {
              sortBy: state.sortBy,
              sortDirection: state?.sortDirection || DESC,
            },
        moreFilter:
          !newFilter && !__appendFilter
            ? {}
            : ({
                ...defaultExtendQueryParams,
                ...newFilter,
                ...fixedExtendQueryParams,
              } as TQueryExtendParams),
      } as TOnQueryArgs;
    },
    [defaultExtendQueryParams, fixedExtendQueryParams, dfPaging, __appendFilter],
  );

  const [data, setData] = useState(paginate(memoSource, dfState.pageIndex, dfState.pageSize));
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const [listState, setListState] = useState<TListState>(dfState);
  const [selectable, setSelectable] = useState<boolean>(defaultSelectable === true ? true : false);
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [interactItem, setInteractItem] = useState<T | null>(null);
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [itemAction, setItemAction] = useState<string | null>(ACTION.NONE);

  const isSelected = useCallback(
    (item: T) => {
      if (!item) return false;
      const itemId = __getid(item);
      if (!itemId) return false;
      const selecteds = cloneDeep(selectedItems);
      if (selecteds.length === 0) return false;
      return selecteds.findIndex((select) => __getid(select) === itemId) >= 0;
    },
    [__getid, selectedItems],
  );

  const isCheckAll = useCallback(
    (checks: T[] = [], dataPerPage: T[] = []) => {
      if (!Array.isArray(checks) || checks.length === 0) return false;
      if (!Array.isArray(dataPerPage) || dataPerPage.length === 0) return false;
      if (checks.length < dataPerPage.length) return false;

      let is = true,
        i = 0;
      while (is && i < dataPerPage.length) {
        const item = dataPerPage[i];
        if (checks.findIndex((check) => __getid(check) === __getid(item)) < 0) is = false;
        else i++;
      }
      return is;
    },
    [__getid],
  );

  const queryLocaly = useCallback(
    (page: number, size: number, sortBy?: string, sortDirection?: TSortDirect) => {
      if (typeof onQueryLocaly !== 'function') {
        let result = paginate(memoSource, page, size);
        setListState((state) => ({
          ...state,
          pageIndex: page,
          pageSize: size,
          totalCount: memoSource.length,
        }));
        setData(result);
      } else {
        const queryArgs = getQueryArgs(listState);

        if (typeof sortBy === 'string')
          queryArgs.sort = {
            ...queryArgs.sort,
            sortBy,
            sortDirection: sortDirection || queryArgs.sort?.sortDirection || DESC,
          };

        let result: T[] = [];

        try {
          result = onQueryLocaly(queryArgs);
        } catch (error) {
          console.log(error);
        }

        setListState((state) => ({
          ...state,
          ...queryArgs.sort,
          ...queryArgs.moreFilter,
          totalCount: Array.isArray(result) ? result.length : 0,
          pageIndex: page,
          pageSize: size,
        }));

        setData(Array.isArray(result) ? paginate(result, page, size) : []);
      }
    },
    [onQueryLocaly, getQueryArgs, listState, memoSource],
  );

  const updateFilter = useCallback(
    (filter: TQueryExtendParams) => {
      if (typeof queryLocaly !== 'function') return;
      const queryArgs = getQueryArgs(listState, filter);
      queryLocaly(
        queryArgs.pagination.pageIndex,
        queryArgs.pagination.pageSize,
        queryArgs.sort?.sortBy,
        queryArgs.sort?.sortDirection,
      );
      return;
    },
    [listState, getQueryArgs, queryLocaly],
  );

  const reload = useCallback(() => {
    if (typeof queryLocaly !== 'function') return;
    const queryArgs = getQueryArgs(listState);
    queryLocaly(
      queryArgs.pagination.pageIndex,
      queryArgs.pagination.pageSize,
      queryArgs.sort?.sortBy,
      queryArgs.sort?.sortDirection,
    );
    return;
  }, [listState, getQueryArgs, queryLocaly]);

  const updatePaging = useCallback(
    async (page: number, size: number) => {
      if (typeof queryLocaly !== 'function') return;
      queryLocaly(page, size);
      return;
    },
    [queryLocaly],
  );

  const updateSort = useCallback(
    (sortBy: string, sortDirection: TSortDirect) => {
      if (typeof queryLocaly !== 'function') return;
      const queryArgs = cloneDeep(listState);
      queryArgs.sortBy = sortBy;
      queryArgs.sortDirection = sortDirection;
      queryLocaly(queryArgs.pageIndex, queryArgs.pageSize, queryArgs.sortBy, queryArgs.sortDirection);
      return;
    },
    [listState, queryLocaly],
  );

  const checkOneItem = useCallback(
    (item: T) => {
      if (!item) return;
      const itemId = __getid(item);
      if (!itemId) return;

      const selecteds = cloneDeep(selectedItems);

      const shouldUnSelect = selecteds.findIndex((select) => __getid(select) === itemId) >= 0;
      if (shouldUnSelect) {
        const newListChecked = selecteds.filter((select) => __getid(select) !== itemId);
        setSelectedItems(newListChecked);
        setCheckAll(isCheckAll(newListChecked, data));
      } else {
        selecteds.push(item);
        setSelectedItems(selecteds);
        setCheckAll(isCheckAll(selecteds, data));
      }
    },
    [__getid, isCheckAll, selectedItems, data],
  );

  const checkAllItems = useCallback(
    (checked: boolean) => {
      const dataInPage = cloneDeep(data);
      if (!Array.isArray(dataInPage) || dataInPage.length === 0) return;

      let selecteds = cloneDeep(selectedItems);

      if (checked) {
        setCheckAll(true);
        const newSelecteds = dataInPage.filter((item) => {
          const itemId = __getid(item);
          if (!itemId) return false;
          return selecteds.findIndex((select) => __getid(select) === itemId) < 0;
        });
        selecteds = selecteds.concat(newSelecteds);
        setSelectedItems(selecteds);
      } else {
        setCheckAll(false);
        const listUncheckIds = dataInPage.map((p) => __getid(p));
        const newSelecteds = selecteds.filter((item) => listUncheckIds.indexOf(__getid(item)) < 0);
        setSelectedItems(newSelecteds);
      }
    },
    [__getid, selectedItems, data],
  );

  const clearSelectItems = () => {
    setCheckAll(false);
    setSelectedItems([]);
  };

  const isShowMultiAction = useCallback(() => {
    return selectable === true && selectedItems.length > 0;
  }, [selectable, selectedItems]);

  const setItemActionDetail = useCallback(
    (detail: { action: string; item?: T; element?: any; keepAnchor?: boolean; keepInteract?: boolean }) => {
      const { action, item, element, keepAnchor, keepInteract } = detail;
      if (!!action) {
        setItemAction(action);
        if (!keepInteract) setInteractItem(!!item ? item : null);
        if (!keepAnchor) setAnchorEl(!!element ? element : null);
      }
    },
    [],
  );

  const clearItemAction = useCallback(() => {
    setItemAction(ACTION.NONE);
    setInteractItem(null);
    setAnchorEl(null);
  }, []);

  useEffect(() => {
    if (!(Array.isArray(data) && data.length > 0)) {
      setCheckAll(false);
      return;
    }

    const cloneData = cloneDeep(data);
    setCheckAll(isCheckAll(selectedItems, cloneData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const toggleSelectable = useCallback((isOn: boolean) => {
    setSelectable(isOn);

    if (!isOn) {
      setCheckAll(false);
      setSelectedItems([]);
    }
  }, []);

  const isAction = useCallback(
    (action: string) => {
      return itemAction === action;
    },
    [itemAction],
  );

  const isItemInteractAction = useCallback(
    (action: string) => {
      return itemAction === action && !!interactItem;
    },
    [itemAction, interactItem],
  );

  const isItemInteractWithAnchorAction = useCallback(
    (action: string) => {
      return itemAction === action && !!interactItem && !!anchorEl;
    },
    [itemAction, interactItem, anchorEl],
  );

  return {
    state: {
      data,
      listState,
      selectedItems,
      isCheckAll: checkAll,
      interactItem,
      anchorEl,
      selectable,
      isShowMultiAction,
      isSelected,
    },
    control: {
      updatePaging,
      updateSort,
      updateFilter,
      reload,
      toggleSelectable,
      setSelectedItems,
      clearSelectItems,
      checkOneItem,
      checkAllItems,
    },
    action: {
      is: isAction,
      isItemInteractAction: isItemInteractAction,
      isItemInteractWithAnchorAction: isItemInteractWithAnchorAction,
      set: setItemActionDetail,
      clear: clearItemAction,
    },
  };
}
export default useStaticListState;
