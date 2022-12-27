import http from '@/api/http';
import httpMock from '@/api/httpMock';
import mockAdapter from '@/api/mockAdapter';
import { TApiResponseWithMessageOnly } from '@/api/_types';
import type { AxiosResponse } from 'axios';

const LINK = '/api/booking/sell/detail';

const isMock = true;

const mockSetup = () => {
  mockAdapter.onDelete(LINK).reply(200, {
    message: 'Deleted!',
  } as TApiResponseWithMessageOnly);
};

if (isMock) mockSetup();

const api = (payload: { id: string }): Promise<AxiosResponse<TApiResponseWithMessageOnly>> => {
  const url = `${LINK}/${payload.id}`;
  return !isMock ? http.delete(url) : httpMock.get(url);
};
export default api;
