import tryCall from '@/api/tryCall';
import tryDo from '@/functions/tryDo';
import wait from '@/functions/wait';
import { isValidResult } from '@/hooks/useAsyncListState/functions';
import type { TOnQueryArgs, TOnQueryRetuns } from '@/hooks/useAsyncListState/_types';
import type { TListDataQueryModel } from '@/_types/TListDataModel';
import api from './api';
import type { T__module__ListItem } from '../../_types';

const defaultReturns: TOnQueryRetuns<T__module__ListItem> = {
  result: [],
  totalCount: 0,
};

const getList = async (args: TOnQueryArgs): Promise<TOnQueryRetuns<T__module__ListItem>> => {
  const payload: TListDataQueryModel = {
    pageIndex: args?.pagination?.pageIndex || 1,
    pageSize: args?.pagination?.pageSize || 10,
  };

  const [data, error] = await tryCall(api, payload).desireSuccessWith((response) =>
    isValidResult<T__module__ListItem>(response?.data)
  );
  if (error) return defaultReturns;

  await tryDo(wait, 1000);

  return data;
};
export default getList;
