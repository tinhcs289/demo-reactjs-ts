import { default as defaultHttp } from '@/api/http';
import httpMock from '@/api/httpMock';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { ApiPayload, ApiReturns } from './_types';
import { LINK } from './constants';
import mock from './mock';
if (LINK.isMock) mock();
export default async function api(
  payload: ApiPayload,
  http?: AxiosInstance
): Promise<AxiosResponse<ApiReturns>> {
  const url = `${LINK.url}/${payload?.refreshToken}`;
  if (!!LINK.isMock) {
    return httpMock.get(url);
  }
  if (!!http) {
    return http.get(url);
  }
  return defaultHttp.get(url);
}
