import http from '@/api/http';
import httpMock from '@/api/httpMock';
import mockAdapter from '@/api/mockAdapter';
import { T__module__ListItem } from '../../_types';
import type { TListDataModel, TListDataQueryModel } from '@/types';
import type { AxiosResponse } from 'axios';

import page1 from './page-1.json';
import page2 from './page-2.json';
import page3 from './page-3.json';
import page4 from './page-4.json';

const LINK = '/api/booking/sell/list';

const isMock = true;

const mockSetup = () => {
  mockAdapter.onGet(LINK, { params: { pageIndex: 1, pageSize: 10 } }).reply(200, page1);
  mockAdapter.onGet(LINK, { params: { pageIndex: 2, pageSize: 10 } }).reply(200, page2);
  mockAdapter.onGet(LINK, { params: { pageIndex: 3, pageSize: 10 } }).reply(200, page3);
  mockAdapter.onGet(LINK, { params: { pageIndex: 4, pageSize: 10 } }).reply(200, page4);
};

if (isMock) mockSetup();

const api = (payload: TListDataQueryModel): Promise<AxiosResponse<TListDataModel<T__module__ListItem>>> => {
  return !isMock ? http.get(LINK, { params: payload }) : httpMock.get(LINK, { params: payload });
};
export default api;
