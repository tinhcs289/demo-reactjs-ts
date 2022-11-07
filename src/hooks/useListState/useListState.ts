import { useState, useMemo, useCallback, useEffect } from 'react';
import {
  TPagingState,
  TSortState,
  TQueryExtendParams,
  TPaginStateNullable,
  TSortStateNullable,
  TListState,
  TSortDirect,
} from './types';
import { AxiosResponse } from 'axios';
import { ACTION, ERequestStatus, PAGE_INDEX, PAGE_SIZE, DESC } from './constants';
import paginate from '@/helpers/arrayHelpers/paginate';
import isNotEmptyObject from '@/helpers/commonHelpers/isNotEmptyObject';
import arrayOrEmpty from '@/helpers/formatHelpers/arrayOrEmpty';
import intOrDefault from '@/helpers/formatHelpers/intOrDefault';
import cloneDeep from 'lodash/cloneDeep';
import isNotNullAndEquals from '../../helpers/commonHelpers/isNotNullAndEquals';

type TOnQueryArgs = {
  pagination: TPagingState;
  sort?: TSortState;
  moreFilter?: TQueryExtendParams;
};

type TOnQueryLocalyArgs = {
  sort?: TSortState;
  moreFilter?: TQueryExtendParams;
};

type TOnQueryRetuns<T> = {
  result: T[];
  totalCount: number;
};

interface TUseListStateParams<T extends { [x: string]: any }> {
  source?: T[];
  onQuery?: (args: TOnQueryArgs) => Promise<AxiosResponse<TOnQueryRetuns<T>>>;
  onQueryLocaly?: (args: TOnQueryLocalyArgs) => T[];
  localy?: boolean;
  idField?: string;
  defaultSelectable?: boolean;
  defaultPagination?: TPaginStateNullable & { totalCount?: number };
  defaultSort?: TSortStateNullable;
  defaultExtendQueryParams?: TQueryExtendParams;
  fixedExtendQueryParams?: TQueryExtendParams;
  queryOnFirstLoad?: boolean;
}

const useListState = <T extends { [x: string]: any }>(args: TUseListStateParams<T>) => {
  const {
    idField,
    source,
    defaultSelectable,
    defaultPagination,
    defaultSort,
    defaultExtendQueryParams,
    fixedExtendQueryParams,
    localy,
    onQuery,
    onQueryLocaly,
    queryOnFirstLoad,
  } = args;

  const memoSource = useMemo(() => {
    return source instanceof Array && source.length > 0 ? source : [];
  }, [source]);

  const shouldAppendMoreFilter = useCallback(() => {
    return isNotEmptyObject(defaultExtendQueryParams) || isNotEmptyObject(fixedExtendQueryParams);
  }, [defaultExtendQueryParams, fixedExtendQueryParams]);

  const memoListState = useMemo(() => {
    return {
      totalCount: defaultPagination?.totalCount || memoSource.length,
      pageIndex: defaultPagination?.pageIndex || PAGE_INDEX,
      pageSize: defaultPagination?.pageIndex || PAGE_SIZE,
      sortBy: defaultSort?.sortBy,
      sortDirection: defaultSort?.sortDirection,
      ...(shouldAppendMoreFilter()
        ? {
            moreFilter: {
              ...defaultExtendQueryParams,
              ...fixedExtendQueryParams,
            },
          }
        : {}),
    } as TListState;
  }, [
    defaultPagination,
    defaultSort,
    defaultExtendQueryParams,
    fixedExtendQueryParams,
    memoSource,
    shouldAppendMoreFilter,
  ]);

  const getQueryArgs = useCallback(
    (state: TListState) => {
      const queryArgs: TOnQueryArgs = {
        pagination: {
          pageIndex: state?.pageIndex || defaultPagination?.pageIndex || PAGE_INDEX,
          pageSize: state?.pageSize || defaultPagination?.pageSize || PAGE_SIZE,
        },
        ...(!!state?.sortBy
          ? {
              sort: {
                sortBy: state.sortBy,
                sortDirection: state?.sortDirection || DESC,
              },
            }
          : {}),
        ...(shouldAppendMoreFilter()
          ? {
              moreFilter: {
                ...defaultExtendQueryParams,
                ...fixedExtendQueryParams,
              },
            }
          : {}),
      };

      return queryArgs;
    },
    [defaultExtendQueryParams, fixedExtendQueryParams, defaultPagination, shouldAppendMoreFilter],
  );

  const [data, setData] = useState(paginate(memoSource, memoListState.pageIndex, memoListState.pageSize));
  const [listState, setListState] = useState<TListState>(memoListState);
  const [fetchState, setFetchState] = useState<ERequestStatus>(ERequestStatus.NONE);
  const [selectable, setSelectable] = useState<boolean>(defaultSelectable === true ? true : false);
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [interactItem, setInteractItem] = useState<T | null>(null);
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [itemAction, setItemAction] = useState<string | null>(ACTION.NONE);

  const getIdValue = useCallback(
    (item?: T) => {
      if (!item) return null;
      if (typeof idField !== 'string') return item['id'];

      return item[idField];
    },
    [idField],
  );

  const isSelected = useCallback(
    (itemId: any) => selectedItems?.findIndex?.((p) => getIdValue(p) === itemId) >= 0,
    [getIdValue, selectedItems],
  );

  const isCheckAll = useCallback(
    (checks: T[] = [], _data: T[] = []) => {
      let is = true;
      if (!(checks instanceof Array && checks.length > 0) || !(_data instanceof Array && _data.length > 0)) is = false;

      let i = 0;
      while (is && i < _data.length) {
        // eslint-disable-next-line no-loop-func
        if (checks.findIndex((item) => getIdValue(item) === getIdValue(_data[i])) < 0) is = false;
        else i = i + 1;
      }
      return is;
    },
    [getIdValue],
  );

  const queryLocaly = useCallback(
    (page: number, size: number, sortBy?: string, sortDirection?: TSortDirect) => {
      if (!!localy) {
        if (typeof onQueryLocaly !== 'function') {
          let result = paginate(memoSource, page, size);
          setListState((state) => ({ ...state, pageIndex: page, pageSize: size, totalCount: memoSource.length }));
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
            ...queryArgs,
            totalCount: result instanceof Array ? result.length : 0,
            pageIndex: page,
            pageSize: size,
          }));

          setData(result instanceof Array ? paginate(result, page, size) : []);
        }
      }
    },
    [localy, memoSource, onQueryLocaly, getQueryArgs, listState],
  );

  const queryWithAxios = useCallback(
    async (state: TListState) => {
      if (!!onQuery) {
        let [result, totalCount]: [T[], number] = [[], 0];
        setFetchState(ERequestStatus.REQUESTING);
        const queryArgs = getQueryArgs(state);
        try {
          const response = await onQuery(queryArgs);
          result = arrayOrEmpty(response?.data?.result);
          totalCount = intOrDefault(response?.data?.totalCount, 0);

          setData(result);
          setListState((s) => ({ ...s, totalCount }));
          setFetchState(ERequestStatus.REQUESTSUCCESS);
        } catch (error) {
          console.log(error);
          setFetchState(ERequestStatus.REQUESTFAIL);
        } finally {
          setFetchState(ERequestStatus.NONE);
        }
      }
    },
    [onQuery, getQueryArgs],
  );

  const updatePaging = useCallback(
    async (page: number, size: number) => {
      if (!!localy) {
        queryLocaly(page, size);
        return;
      }

      if (!!onQuery) {
        const state = cloneDeep(listState);
        queryWithAxios({ ...state, pageIndex: page, pageSize: size });
        return;
      }
    },
    [onQuery, listState, localy, queryLocaly, queryWithAxios],
  );

  const updateSort = useCallback(
    (sortBy: string, sortDirection: TSortDirect) => {
      const queryArgs = cloneDeep(listState);

      queryArgs.sortBy = sortBy;
      queryArgs.sortDirection = sortDirection;

      if (!!localy) {
        queryLocaly(queryArgs.pageIndex, queryArgs.pageSize, queryArgs.sortBy, queryArgs.sortDirection);
        return;
      }

      if (!!onQuery) {
        queryWithAxios({ ...queryArgs, pageIndex: 1 });
        return;
      }
    },
    [listState, localy, onQuery, queryLocaly, queryWithAxios],
  );

  const checkOneItem = useCallback(
    (item: T) => {
      const isItemCheckedBefore =
        selectedItems.findIndex((_item) => isNotNullAndEquals(getIdValue(_item), getIdValue(item))) >= 0;
      if (isItemCheckedBefore) {
        const newListChecked = selectedItems.filter((_item) => getIdValue(_item) !== getIdValue(item));
        setSelectedItems(newListChecked);
        setCheckAll(isCheckAll(newListChecked, data));
      } else {
        const _newListChecked = cloneDeep(selectedItems);
        _newListChecked.push(item);
        setSelectedItems(_newListChecked);
        setCheckAll(isCheckAll(_newListChecked, data));
      }
    },
    [getIdValue, data, selectedItems, isCheckAll],
  );

  const checkAllItem = useCallback(
    (checked: boolean) => {
      if (checked) {
        setCheckAll(true);
        let cloneListChecked = cloneDeep(selectedItems);
        const cloneSelections = data.filter(
          (p) => cloneListChecked.findIndex((item) => isNotNullAndEquals(getIdValue(item), getIdValue(p))) < 0,
        );
        cloneListChecked = cloneListChecked.concat(cloneSelections);
        setSelectedItems(cloneListChecked);
      } else {
        setCheckAll(false);
        if (data instanceof Array && data.length > 0) {
          const listUncheckIds = data.map((p) => getIdValue(p));
          if (listUncheckIds instanceof Array && listUncheckIds.length > 0) {
            const _cloneListChecked = selectedItems.filter((item) => listUncheckIds.indexOf(getIdValue(item)) < 0);
            setSelectedItems(_cloneListChecked);
          }
        }
      }
    },
    [data, getIdValue, selectedItems],
  );

  const clearSelectItems = () => {
    setCheckAll(false);
    setSelectedItems([]);
  };

  const isShowMultiAction = useCallback(() => {
    return selectable === true && selectedItems instanceof Array && selectedItems.length > 0;
  }, [selectable, selectedItems]);

  const clearItemAction = () => {
    setItemAction(ACTION.NONE);
    setInteractItem(null);
    setAnchorEl(null);
  };

  const isMoreAction = useCallback(() => {
    return itemAction === ACTION.MORE_ACTION && !!interactItem && !!anchorEl;
  }, [anchorEl, interactItem, itemAction]);

  useEffect(() => {
    if (!(data instanceof Array && data.length > 0)) {
      setCheckAll(false);
      return;
    }

    const cloneData = cloneDeep(data);
    setCheckAll(isCheckAll(selectedItems, cloneData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (queryOnFirstLoad === true && typeof onQuery === 'function') {
      const state = cloneDeep(listState);
      queryWithAxios({ ...state, pageIndex: 1 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
export default useListState;
