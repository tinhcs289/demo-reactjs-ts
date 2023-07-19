import http from '@/api/http';
import httpMock from '@/api/httpMock';
import tryDo from '@/functions/tryDo';
import type { AxiosResponse } from 'axios';
import { ApiPayload, ApiReturns } from './_types';
import { LINK } from './constants';
import { migrate } from './migrate';
import mock from './mock';
if (LINK.isMock) mock();
export default async function api(payload?: ApiPayload): Promise<AxiosResponse<ApiReturns>> {
  if (LINK.isMock) return httpMock.get(LINK.url);
  const migratedPayload = migrate.AEQUITAS.migratePayload(payload as any);
  let configs = {};
  if (!!payload?.accessToken)
    configs = { ...configs, headers: { Authorization: `Bearer ${payload.accessToken}` } };
  const [error, response] = await tryDo<AxiosResponse<any>>(http.post(LINK.url, migratedPayload, configs));
  if (error) return error as unknown as AxiosResponse<ApiReturns>;
  if (!response) return response as unknown as AxiosResponse<ApiReturns>;
  //@ts-ignore
  response['originalData'] = response.data;
  const migratedData = migrate.AEQUITAS.migrateResponseData(response?.data) as ApiReturns;
  response.data = migratedData;
  return response;
}
