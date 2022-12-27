import http from '@/api/http';
import httpMock from '@/api/httpMock';
import mockAdapter from '@/api/mockAdapter';
import { TOrderListItem } from '../../_types';
import type { TListDataModel, TListDataQueryModel } from '@/_types/TListDataModel';
import type { AxiosResponse } from 'axios';

import page1size10 from './page-1.json';
import page2size10 from './page-2.json';
import page3size10 from './page-3.json';
import page4size10 from './page-4.json';
import page1size20 from './page-1-page-size-20.json';
import page2size20 from './page-2-page-size-20.json';

const LINK = '/api/booking/sell/list';

const isMock = true;

const mockSetup = () => {
  mockAdapter.onGet(LINK, { params: { pageIndex: 1, pageSize: 10 } }).reply(200, page1size10);
  mockAdapter.onGet(LINK, { params: { pageIndex: 2, pageSize: 10 } }).reply(200, page2size10);
  mockAdapter.onGet(LINK, { params: { pageIndex: 3, pageSize: 10 } }).reply(200, page3size10);
  mockAdapter.onGet(LINK, { params: { pageIndex: 4, pageSize: 10 } }).reply(200, page4size10);
  mockAdapter.onGet(LINK, { params: { pageIndex: 1, pageSize: 20 } }).reply(200, page1size20);
  mockAdapter.onGet(LINK, { params: { pageIndex: 2, pageSize: 20 } }).reply(200, page2size20);
};

if (isMock) mockSetup();

const api = (payload: TListDataQueryModel): Promise<AxiosResponse<TListDataModel<TOrderListItem>>> => {
  return !isMock ? http.get(LINK, { params: payload }) : httpMock.get(LINK, { params: payload });
};
export default api;