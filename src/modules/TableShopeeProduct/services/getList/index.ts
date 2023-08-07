import http from '@/api/http';
import httpMock, { mockAdapter } from '@/api/httpMock';
import callHttp from '@/helpers/asyncHelpers/callHttp';
import type {
  OnQueryArgs,
  OnQueryReturns,
} from '@/helpers/contextHelpers/createAsyncListContextWithComponents';
import { isValidResult } from '@/helpers/contextHelpers/createAsyncListContextWithComponents';
import tryDo from '@/helpers/asyncHelpers/tryDo';
import wait from '@/helpers/asyncHelpers/wait';
import type { PaginatedListData, PaginatedListQuery } from '@/types';
import type { AxiosResponse } from 'axios';
import type { RowData } from '../../_types';
import page1size100 from './page-1-page-size-100.json';
import page1size20 from './page-1-page-size-20.json';
import page1size50 from './page-1-page-size-50.json';
import page1size10 from './page-1.json';
import page2size20 from './page-2-page-size-20.json';
import page2size10 from './page-2.json';
import page3size10 from './page-3.json';
import page4size10 from './page-4.json';
const LINK = '/api/booking/sell/list';
const isMock = true;
const mockSetup = () => {
  mockAdapter.onGet(LINK, { params: { pageIndex: 1, pageSize: 10 } }).reply(200, page1size10);
  mockAdapter.onGet(LINK, { params: { pageIndex: 2, pageSize: 10 } }).reply(200, page2size10);
  mockAdapter.onGet(LINK, { params: { pageIndex: 3, pageSize: 10 } }).reply(200, page3size10);
  mockAdapter.onGet(LINK, { params: { pageIndex: 4, pageSize: 10 } }).reply(200, page4size10);
  mockAdapter.onGet(LINK, { params: { pageIndex: 1, pageSize: 20 } }).reply(200, page1size20);
  mockAdapter.onGet(LINK, { params: { pageIndex: 2, pageSize: 20 } }).reply(200, page2size20);
  mockAdapter.onGet(LINK, { params: { pageIndex: 1, pageSize: 50 } }).reply(200, page1size50);
  mockAdapter.onGet(LINK, { params: { pageIndex: 1, pageSize: 100 } }).reply(200, page1size100);
};

if (isMock) mockSetup();
async function api(payload: PaginatedListQuery): Promise<AxiosResponse<PaginatedListData<RowData>>> {
  return !isMock ? http.get(LINK, { params: payload }) : httpMock.get(LINK, { params: payload });
}
const defaultReturns: OnQueryReturns<RowData> = {
  result: [],
  totalCount: 0,
};
function dataIsValid(r: any) {
  return isValidResult<RowData>(r?.data);
}
export default async function getList(args: OnQueryArgs): Promise<OnQueryReturns<RowData>> {
  const payload = {
    pageIndex: args?.pageIndex || 1,
    pageSize: args?.pageSize || 10,
  };
  const [error, data] = await callHttp(api(payload)).waitFor(dataIsValid);
  if (error) return defaultReturns;
  await tryDo(wait(500));
  return data;
}
