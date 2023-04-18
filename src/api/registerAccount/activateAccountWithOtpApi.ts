import http from '@/api/http';
import httpMock from '@/api/httpMock';
import mockAdapter from '@/api/mockAdapter';
import { ApiResponseWithMessageOnly } from '@/api/_types';
import type { AxiosResponse } from 'axios';

const LINK = '/api/auth/account-activate';

const isMock = true;

const mockSetup = () => {
  mockAdapter.onPost(LINK).reply(200, {
    message: 'Account activated!',
  } as ApiResponseWithMessageOnly);
};

if (isMock) mockSetup();

const activateAccountWithOtpApi = (payload: {
  username: string;
  optCode: string;
}): Promise<AxiosResponse<ApiResponseWithMessageOnly>> => {
  return !isMock ? http.post(LINK, payload) : httpMock.post(LINK, payload);
};
export default activateAccountWithOtpApi;
