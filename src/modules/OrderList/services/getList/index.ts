import type { OnQueryCallback, OnQueryReturns } from '@/functions/createAsyncListContext2WithComponents';
import { isValidResult } from '@/functions/createAsyncListContext2WithComponents';
import tryCall from '@/functions/tryCall';
import tryDo from '@/functions/tryDo';
import wait from '@/functions/wait';
import type { TOrderListItem } from '../../_types';
import api from './api';
type Row = TOrderListItem;
const defaultReturns: OnQueryReturns<Row> = {
  result: [],
  totalCount: 0,
};
const dataIsValid = (r: any) => isValidResult<Row>(r?.data);
const getList: OnQueryCallback<Row> = async (args) => {
  const payload = {
    pageIndex: args?.pageIndex || 1,
    pageSize: args?.pageSize || 10,
  };
  const [data, error] = await tryCall(api, payload).desireSuccessWith(dataIsValid);
  if (error) return defaultReturns;
  await tryDo(wait, 1000);
  return data;
};
export default getList;
