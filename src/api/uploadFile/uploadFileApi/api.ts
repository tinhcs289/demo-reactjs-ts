import { http, httpMock } from '@/api/_axios';
import type { AxiosResponse } from 'axios';
import { ApiPayload, ApiReturns } from './_types';
import { LINK } from './constants';
import mock from './mock';
if (LINK.isMock) mock();
export default async function api(payload: ApiPayload): Promise<AxiosResponse<ApiReturns>> {
  const formData = new FormData();
  formData.append('file', payload.file);
  return !LINK.isMock
    ? http.post(`${LINK.url}/${payload.folder}`, formData)
    : httpMock.post(`${LINK.url}/${payload.folder}`, formData);
}
