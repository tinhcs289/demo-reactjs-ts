import http from '@/api/http';
import httpMock from '@/api/httpMock';
import mockAdapter from '@/api/mockAdapter';
import { TApiResponseWithMessageOnly } from '@/api/_types';
import type { AxiosResponse } from 'axios';

const LINK = '/api/auth/account-activate';

const isMock = true;

const mockSetup = () => {
  mockAdapter.onPost(LINK).reply(200, {
    message: 'Account activated!',
  } as TApiResponseWithMessageOnly);
};

if (isMock) mockSetup();

const activateAccountWithOtpApi = (payload: {
  username: string;
  optCode: string;
}): Promise<AxiosResponse<TApiResponseWithMessageOnly>> => {
  return !isMock ? http.post(LINK, payload) : httpMock.post(LINK, payload);
};
export default activateAccountWithOtpApi;
