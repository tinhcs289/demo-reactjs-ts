import http from '@/api/http';
import httpMock, { mockAdapter } from '@/api/httpMock';
import endpoints from '@/constants/endpoints';
import { ApiResponseWithMessageOnly } from '@/types';
import type { AxiosResponse } from 'axios';
const LINK = endpoints['register'];
function mockSetup() {
  mockAdapter.onPost(LINK.url).reply(200, {
    message: 'Account created!',
  } as ApiResponseWithMessageOnly);
};
if (LINK.isMock) mockSetup();
export type RegisterApiParams = {
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
};
export type RegisterApiReturns = ApiResponseWithMessageOnly;
export default async function registerApi(payload: RegisterApiParams): Promise<AxiosResponse<RegisterApiReturns>> {
  return !LINK.isMock ? http.post(LINK.url, payload) : httpMock.post(LINK.url, payload);
};
