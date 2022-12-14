import getListBookingSell from '@/api/booking/getListBookingSell';
import type { TBookingSellListItem } from '@/api/booking/_types';
import tryCall from '@/api/tryCall';
import type { TOnQueryArgs, TOnQueryRetuns } from '@/hooks/useListState/_types';
import type { TListDataQueryModel } from '@/_types/TListDataModel';
import type { AxiosResponse } from 'axios';

const defaultReturns: TOnQueryRetuns<TBookingSellListItem> = {
  result: [],
  totalCount: 0,
};

const isResponseOk = (res: AxiosResponse<TOnQueryRetuns<TBookingSellListItem>, any>) =>
  res.status === 200 &&
  Array.isArray(res.data.result) &&
  res.data.result.length > 0 &&
  typeof res.data.totalCount === 'number' &&
  !Number.isNaN(res.data.totalCount) &&
  res.data.totalCount > 0;

const getList = async (args: TOnQueryArgs): Promise<TOnQueryRetuns<TBookingSellListItem>> => {
  const payload: TListDataQueryModel = {
    pageIndex: args?.pagination?.pageIndex || 1,
    pageSize: args?.pagination?.pageSize || 10,
  };

  return (await tryCall(getListBookingSell(payload), isResponseOk)) || defaultReturns;
};
export default getList;
