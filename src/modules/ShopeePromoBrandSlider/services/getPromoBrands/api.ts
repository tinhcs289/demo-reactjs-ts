import http from '@/api/http';
import httpMock, { mockAdapter } from '@/api/httpMock';
import type { ShopeePromoBrandItem } from '@/types/Shopee';
import type { AxiosResponse } from 'axios';
import data from './mock.json';
const LINK = '/api/pages/mall_shops_promo';
const isMock = true;
const mockSetup = () => {
  mockAdapter.onGet(LINK).reply(200, data);
};
if (isMock) mockSetup();
export default async function api(): Promise<
  AxiosResponse<{
    shops: ShopeePromoBrandItem[];
  }>
> {
  return !isMock ? http.get(LINK) : httpMock.get(LINK);
}
