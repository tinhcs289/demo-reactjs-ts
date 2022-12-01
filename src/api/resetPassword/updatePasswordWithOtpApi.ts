import http from '@/api/http';
import httpMock from '@/api/httpMock';
import mockAdapter from '@/api/mockAdapter';
import { TApiResponseWithMessageOnly } from '@/api/_types';
import type { AxiosResponse } from 'axios';

const LINK = '/api/auth/account-update-password';

const isMock = true;

const mockSetup = () => {
  mockAdapter.onPut(LINK).reply(200, {
    message: 'Password updated!',
  } as TApiResponseWithMessageOnly);
};

if (isMock) mockSetup();

const updatePasswordWithOtpApi = (payload: {
  username: string;
  otpCode: string;
  newPassword: string;
  newPasswordReEnterd: string;
}): Promise<AxiosResponse<TApiResponseWithMessageOnly>> => {
  return !isMock ? http.put(LINK, payload) : httpMock.post(LINK, payload);
};
export default updatePasswordWithOtpApi;
