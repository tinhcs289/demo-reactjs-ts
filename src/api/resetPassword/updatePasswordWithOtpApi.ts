import http from '@/api/http';
import httpMock, { mockAdapter } from '@/api/httpMock';
import endpoints from '@/constants/endpoints';
import { ApiResponseWithMessageOnly } from '@/types';
import type { AxiosResponse } from 'axios';
const LINK = endpoints['updatePasswordWithOtp'];
function mockSetup() {
  mockAdapter.onPut(LINK.url).reply(200, {
    message: 'Password updated!',
  } as ApiResponseWithMessageOnly);
};
if (LINK.isMock) mockSetup();
export type UpdatePasswordWithOtpApiParams = {
  username: string;
  otpCode: string;
  newPassword: string;
  newPasswordReEnterd: string;
}
export type UpdatePasswordWithOtpApiReturns = ApiResponseWithMessageOnly;
export default async function updatePasswordWithOtpApi(
  payload: UpdatePasswordWithOtpApiParams
): Promise<AxiosResponse<UpdatePasswordWithOtpApiReturns>> {
  return !LINK.isMock ? http.put(LINK.url, payload) : httpMock.post(LINK.url, payload);
};
