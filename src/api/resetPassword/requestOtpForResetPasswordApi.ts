import http from '@/api/http';
import httpMock, { mockAdapter } from '@/api/httpMock';
import endpoints from '@/constants/endpoints';
import type { ApiResponseWithMessageOnly } from '@/types';
import type { AxiosResponse } from 'axios';
const LINK = endpoints['requestOtpForResetPassword'];
function mockSetup() {
  mockAdapter.onPost(LINK.url).reply(200, {
    message: 'OTP sent!',
  } as ApiResponseWithMessageOnly);
};
if (LINK.isMock) mockSetup();
export type RequestOtpForResetPasswordApiParams = {
  username: string;
  contactType: 'email' | 'sms' | 'phone';
  contact?: string;
};
export type RequestOtpForResetPasswordApiReturns = ApiResponseWithMessageOnly;
export default async function requestOtpForResetPasswordApi(
  payload: RequestOtpForResetPasswordApiParams
): Promise<AxiosResponse<RequestOtpForResetPasswordApiReturns>> {
  return !LINK.isMock ? http.post(LINK.url, payload) : httpMock.post(LINK.url, payload);
};
