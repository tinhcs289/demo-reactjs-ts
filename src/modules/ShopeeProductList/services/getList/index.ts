import tryCall from '@/api/tryCall';
import tryDo from '@/functions/tryDo';
import wait from '@/functions/wait';
import type { TOnQueryArgs, TOnQueryRetuns } from '@/hooks/useAsyncListState/_types';
import type { TListDataQueryModel } from '@/_types/TListDataModel';
import { PAGE_SIZE } from '../../constants';
import type { TShopeeProductItem } from '../../_types';
import api from './api';

const defaultReturns: TOnQueryRetuns<TShopeeProductItem> = {
  result: [],
  totalCount: 0,
};

const getList = async (args: TOnQueryArgs): Promise<TOnQueryRetuns<TShopeeProductItem>> => {
  const payload: TListDataQueryModel = {
    pageIndex: args?.pagination?.pageIndex || 1,
    pageSize: args?.pagination?.pageSize || PAGE_SIZE,
  };

  const [data, error] = await tryCall(api, payload).desireSuccessWith(
    (response) =>
      !!response?.data &&
      Number.isInteger(response.data.total) &&
      response.data.total > 0 &&
      Array.isArray(response.data.item) &&
      response.data.item.length > 0
  );

  if (error) return defaultReturns;

  await tryDo(wait, 500);

  return {
    totalCount: data.total,
    result: data.item,
  };
};
export default getList;
