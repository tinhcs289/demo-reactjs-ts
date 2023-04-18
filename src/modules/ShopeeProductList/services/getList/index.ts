import callHttp from '@/functions/callHttp';
import type { OnQueryArgs, OnQueryReturns } from '@/functions/createAsyncListContext';
import type { PaginatedListQuery } from '@/types';
import type { ShopeeProductItem } from '@/types/Shopee';
import { PAGE_SIZE } from '../../constants';
import api from './api';
const defaultReturns: OnQueryReturns<ShopeeProductItem> = {
  result: [],
  totalCount: 0,
};
function isValidData(r: any) {
  return !!r?.data &&
    Number.isInteger(r.data.total) &&
    r.data.total > 0 &&
    Array.isArray(r.data.item) &&
    r.data.item.length > 0
}
export default async function getList(args: OnQueryArgs): Promise<OnQueryReturns<ShopeeProductItem>> {
  const payload: PaginatedListQuery = {
    pageIndex: args?.pageIndex || 1,
    pageSize: args?.pageSize || PAGE_SIZE,
  };
  const [error, data] = await callHttp(api(payload)).waitFor(isValidData);
  if (error) return defaultReturns;
  return {
    totalCount: data.total,
    result: data.item,
  };
};
