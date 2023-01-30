import http from '@/api/http';
import httpMock from '@/api/httpMock';
import mockAdapter from '@/api/mockAdapter';
import type { TApiResponseWithMessageOnly } from '@/api/_types';
import type { AxiosResponse } from 'axios';

const LINK = '/api/auth/verify-auth-token';

const isMock = true;

const mockSetup = () => {
  mockAdapter.onGet(LINK).reply(200, {
    message: 'Valid token!',
  } as TApiResponseWithMessageOnly);
};

if (isMock) mockSetup();

const verifyAuthenticateTokenApi = (
  accessToken?: string
): Promise<AxiosResponse<TApiResponseWithMessageOnly>> => {
  return !isMock
    ? !!accessToken
      ? http.get(LINK, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
      : http.get(LINK)
    : !!accessToken
    ? httpMock.get(LINK, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
    : httpMock.get(LINK);
};
export default verifyAuthenticateTokenApi;
