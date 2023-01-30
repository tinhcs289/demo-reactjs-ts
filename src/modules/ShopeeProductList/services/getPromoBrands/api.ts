import http from '@/api/http';
import httpMock from '@/api/httpMock';
import mockAdapter from '@/api/mockAdapter';
import type { AxiosResponse } from 'axios';
import { TShopeePromoBrandItem } from '../../_types';

import data from './mock.json';

const LINK = '/api/pages/mall_shops_promo';

const isMock = true;

const mockSetup = () => {
  mockAdapter.onGet(LINK).reply(200, data);
};

if (isMock) mockSetup();

const api = (): Promise<
  AxiosResponse<{
    shops: TShopeePromoBrandItem[];
  }>
> => {
  return !isMock ? http.get(LINK) : httpMock.get(LINK);
};
export default api;
