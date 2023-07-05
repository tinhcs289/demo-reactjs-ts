import { migrate } from '@/api/authentication/loginApi/migrate';
import http from '@/api/http';
import httpMock from '@/api/httpMock';
import tryDo from '@/functions/tryDo';
import type { AxiosResponse } from 'axios';
import { ApiPayload, ApiReturns } from './_types';
import { LINK } from './constants';
import mock from './mock';
if (LINK.isMock) mock();
export default async function api(payload: ApiPayload): Promise<AxiosResponse<ApiReturns>> {
  if (LINK.isMock) return httpMock.post(LINK.url, payload);
  const migratedPayload = migrate.DEFAULT.migratePayload(payload);
  const [error, response] = await tryDo<AxiosResponse<any>>(http.post(LINK.url, migratedPayload));
  if (error) return error as AxiosResponse<ApiReturns>;
  if (!response) return response as unknown as AxiosResponse<ApiReturns>;
  if (!response?.data) return response as AxiosResponse<ApiReturns>;
  //@ts-ignore
  response['originalData'] = response.data;
  const migratedData = migrate.DEFAULT.migrateResponseData(response?.data);
  response.data = migratedData;
  return response as AxiosResponse<ApiReturns>;
}
