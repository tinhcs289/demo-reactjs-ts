import http from '@/api/http';
import httpMock, { mockAdapter } from '@/api/httpMock';
import endpoints from '@/constants/endpoints';
import type { ApiResponseWithMessageOnly } from '@/types';
import type { AxiosResponse } from 'axios';
const LINK = endpoints['verifyAuthenticateToken'];
function mockSetup() {
  mockAdapter.onGet(LINK.url).reply(200, {
    message: 'Valid token!',
  } as ApiResponseWithMessageOnly);
};
if (LINK.isMock) mockSetup();
export type VerifyAuthenticateTokenApiReturns = ApiResponseWithMessageOnly;
export default async function verifyAuthenticateTokenApi(
  accessToken?: string
): Promise<AxiosResponse<VerifyAuthenticateTokenApiReturns>> {
  return !LINK.isMock
    ? !!accessToken
      ? http.get(LINK.url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      : http.get(LINK.url)
    : !!accessToken
      ? httpMock.get(LINK.url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      : httpMock.get(LINK.url);
};
