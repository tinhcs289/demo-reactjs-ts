import http from '@/api/http';
import httpMock, { mockAdapter } from '@/api/httpMock';
import endpoints from '@/constants/endpoints';
import type { ApiResponseWithMessageOnly } from '@/types';
import type { AxiosResponse } from 'axios';
const LINK = endpoints['logout'];
function mockSetup() {
  mockAdapter.onPost(LINK.url).reply(200, {
    message: 'signed out!',
  } as ApiResponseWithMessageOnly);
};
if (LINK.isMock) mockSetup();
export type LogoutApiReturns = ApiResponseWithMessageOnly;
export default async function logoutApi(): Promise<AxiosResponse<LogoutApiReturns>> {
  return !LINK.isMock ? http.post(LINK.url) : httpMock.post(LINK.url);
};
