import { ApiResponseWithMessageOnly } from '@/types';
import http from '@/api/http';
import httpMock, { mockAdapter } from '@/api/httpMock';
import callHttp from '@/functions/callHttp';
import tryDo from '@/functions/tryDo';
import wait from '@/functions/wait';
import type { AxiosResponse } from 'axios';

const LINK = '/api/booking/sell/detail';

const isMock = true;

const mockSetup = () => {
  mockAdapter.onDelete(LINK).reply(200, {
    message: 'Deleted!',
  } as ApiResponseWithMessageOnly);
};
if (isMock) mockSetup();

async function api(payload: {
  id: string;
}): Promise<AxiosResponse<ApiResponseWithMessageOnly>> {
  const url = `${LINK}/${payload.id}`;
  return !isMock ? http.delete(url) : httpMock.get(url);
}
export default async function deleteItem(args: { id: string }) {
  const result = await callHttp(api(args)).waitForSuccess();
  await tryDo(wait(1000));
  return result;
}
