import http from '@/api/http';
import httpMock from '@/api/httpMock';
import type { AxiosResponse } from 'axios';
import { ApiPayload, ApiReturns } from './_types';
import { LINK } from './constants';
import mock from './mock';
if (LINK.isMock) mock();
export default async function api(payload: ApiPayload): Promise<AxiosResponse<ApiReturns>> {
  return !LINK.isMock ? http.put(LINK.url, payload) : httpMock.post(LINK.url, payload);
}
