import http from '@/api/http';
import httpMock, { mockAdapter } from '@/api/httpMock';
import { ShopeeElementSet } from '@/types/Shopee';
import type { AxiosResponse } from 'axios';
import data from './mock.json';
const LINK = '/api/pages/element_set';
const isMock = true;
const mockSetup = () => {
  mockAdapter.onGet(LINK).reply(200, data);
};
if (isMock) mockSetup();
export default async function api(): Promise<AxiosResponse<ShopeeElementSet>> {
  return !isMock ? http.get(LINK) : httpMock.get(LINK);
};
