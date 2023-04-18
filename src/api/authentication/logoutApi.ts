import http from '@/api/http';
import httpMock from '@/api/httpMock';
import mockAdapter from '@/api/mockAdapter';
import type { ApiResponseWithMessageOnly } from '@/api/_types';
import type { AxiosResponse } from 'axios';

const LINK = '/api/auth/sign-out';

const isMock = true;

const mockSetup = () => {
  mockAdapter.onPost(LINK).reply(200, {
    message: 'signed out!',
  } as ApiResponseWithMessageOnly);
};

if (isMock) mockSetup();

const logoutApi = (): Promise<AxiosResponse<ApiResponseWithMessageOnly>> => {
  return !isMock ? http.post(LINK) : httpMock.post(LINK);
};
export default logoutApi;
