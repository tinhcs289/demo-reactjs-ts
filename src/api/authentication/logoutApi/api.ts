import { http, httpMock } from '@/api/_axios';
import type { AxiosResponse } from 'axios';
import { ApiPayload, ApiReturns } from './_types';
import { LINK } from './constants';
import mock from './mock';
if (LINK.isMock) mock();
export default async function api(_payload?: ApiPayload): Promise<AxiosResponse<ApiReturns>> {
  return !LINK.isMock ? http.post(LINK.url) : httpMock.post(LINK.url);
}
