import http from '@/api/http';
import httpMock from '@/api/httpMock';
import type { AxiosResponse } from 'axios';
import { ApiPayload, ApiReturns } from './_types';
import { LINK } from './constants';
import mock from './mock';
if (LINK.isMock) mock();
export default async function api(payload?: ApiPayload): Promise<AxiosResponse<ApiReturns>> {
  return !LINK.isMock
    ? !!payload?.accessToken
      ? http.get(LINK.url, {
          headers: { Authorization: `Bearer ${payload.accessToken}` },
        })
      : http.get(LINK.url)
    : !!payload?.accessToken
    ? httpMock.get(LINK.url, {
        headers: { Authorization: `Bearer ${payload.accessToken}` },
      })
    : httpMock.get(LINK.url);
}
