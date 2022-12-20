import tryCall from '@/api/tryCall';
import tryDo from '@/functions/tryDo';
import wait from '@/functions/wait';
import type { TOnQueryArgs, TOnQueryRetuns } from '@/hooks/useListState/_types';
import type { TListDataQueryModel } from '@/_types/TListDataModel';
import getList__module__Api from './api/getList__module__Api';
import type { T__module__ListItem } from './_types';

const getList = async (args: TOnQueryArgs): Promise<TOnQueryRetuns<T__module__ListItem>> => {
  const payload: TListDataQueryModel = {
    pageIndex: args?.pagination?.pageIndex || 1,
    pageSize: args?.pagination?.pageSize || 10,
  };

  const [data, error] = await tryCall(getList__module__Api, payload).desireSuccessWith(
    (response) =>
      Number.isInteger(response?.data?.totalCount) &&
      response.data.totalCount > 0 &&
      Array.isArray(response?.data?.result) &&
      response.data.result.length > 0,
  );
  if (error) {
    return {
      result: [],
      totalCount: 0,
    };
  }

  await tryDo(wait, 1000);

  return data;
};
export default getList;
