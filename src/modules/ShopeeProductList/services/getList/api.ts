import http from '@/api/http';
import httpMock from '@/api/httpMock';
import mockAdapter from '@/api/mockAdapter';
import type { TListDataQueryModel } from '@/_types/TListDataModel';
import type { AxiosResponse } from 'axios';
import { PAGE_SIZE } from '../../constants';
import { TShopeeProductItem } from '../../_types';

import page1 from './page1.json';
import page2 from './page2.json';
import page3 from './page3.json';
import page4 from './page4.json';
import page5 from './page5.json';
import page6 from './page6.json';
import page7 from './page7.json';
import page8 from './page8.json';
import page9 from './page9.json';

const LINK = '/api/recommend/bundle';

const isMock = true;

const mockSetup = () => {
  mockAdapter.onGet(LINK, { params: { pageIndex: 1, pageSize: PAGE_SIZE } }).reply(200, page1);
  mockAdapter.onGet(LINK, { params: { pageIndex: 2, pageSize: PAGE_SIZE } }).reply(200, page2);
  mockAdapter.onGet(LINK, { params: { pageIndex: 3, pageSize: PAGE_SIZE } }).reply(200, page3);
  mockAdapter.onGet(LINK, { params: { pageIndex: 4, pageSize: PAGE_SIZE } }).reply(200, page4);
  mockAdapter.onGet(LINK, { params: { pageIndex: 5, pageSize: PAGE_SIZE } }).reply(200, page5);
  mockAdapter.onGet(LINK, { params: { pageIndex: 6, pageSize: PAGE_SIZE } }).reply(200, page6);
  mockAdapter.onGet(LINK, { params: { pageIndex: 7, pageSize: PAGE_SIZE } }).reply(200, page7);
  mockAdapter.onGet(LINK, { params: { pageIndex: 8, pageSize: PAGE_SIZE } }).reply(200, page8);
  mockAdapter.onGet(LINK, { params: { pageIndex: 9, pageSize: PAGE_SIZE } }).reply(200, page9);
};

if (isMock) mockSetup();

const api = (
  payload: TListDataQueryModel
): Promise<
  AxiosResponse<{
    total: number;
    item: TShopeeProductItem[];
  }>
> => {
  return !isMock ? http.get(LINK, { params: payload }) : httpMock.get(LINK, { params: payload });
};
export default api;
