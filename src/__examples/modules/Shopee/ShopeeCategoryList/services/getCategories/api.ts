import { http, httpMock, mockAdapter } from '@/api';
import type { AxiosResponse } from 'axios';
import { ShopeeCategoryItem } from '@/types/Shopee';

import data from './mock.json';

const LINK = '/api/pages/get_category_tree';

const isMock = true;

const mockSetup = () => {
  mockAdapter.onGet(LINK).reply(200, data);
};

if (isMock) mockSetup();

const api = (): Promise<
  AxiosResponse<{
    category_list: ShopeeCategoryItem[];
  }>
> => {
  return !isMock ? http.get(LINK) : httpMock.get(LINK);
};
export default api;
