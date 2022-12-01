import http from '@/api/http';
import httpMock from '@/api/httpMock';
import mockAdapter from '@/api/mockAdapter';
import { TApiResponseWithMessageOnly } from '@/api/_types';
import type { AxiosResponse } from 'axios';

const LINK = '/api/auth/sign-up';

const isMock = true;

const mockSetup = () => {
  mockAdapter.onPost(LINK).reply(200, {
    message: 'Account created!',
  } as TApiResponseWithMessageOnly);
};

if (isMock) mockSetup();

const registerApi = (payload: {
  username: string;
  password: string;
  passwordReEnter: string;
  email?: string;
  phoneNumber?: string;
  receivedActivationOtpVia?: 'email' | 'sms' | 'phone';
  /**
   * stringify value of `Date` with format `YYYY-MM-DD`
   */
  dayOfBirth?: `${number}${number}${number}${number}-${number}${number}-${number}${number}`;
  firstName?: string;
  middleName?: string;
  lastName?: string;
}): Promise<AxiosResponse<TApiResponseWithMessageOnly>> => {
  return !isMock ? http.post(LINK, payload) : httpMock.post(LINK, payload);
};
export default registerApi;
