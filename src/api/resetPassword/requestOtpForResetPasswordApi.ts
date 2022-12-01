import http from '@/api/http';
import httpMock from '@/api/httpMock';
import mockAdapter from '@/api/mockAdapter';
import { TApiResponseWithMessageOnly } from '@/api/_types';
import type { AxiosResponse } from 'axios';

const LINK = '/api/auth/account-request-opt-for-reset-password';

const isMock = true;

const mockSetup = () => {
  mockAdapter.onPost(LINK).reply(200, {
    message: 'OTP sent!',
  } as TApiResponseWithMessageOnly);
};

if (isMock) mockSetup();

const requestOtpForResetPasswordApi = (payload: {
  username: string;
  contactType: 'email' | 'sms' | 'phone';
}): Promise<AxiosResponse<TApiResponseWithMessageOnly>> => {
  return !isMock ? http.post(LINK, payload) : httpMock.post(LINK, payload);
};
export default requestOtpForResetPasswordApi;
