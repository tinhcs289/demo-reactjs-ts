import http from '@/api/http';
import httpMock, { mockAdapter } from '@/api/httpMock';
import endpoints from '@/constants/endpoints';
import { ApiResponseWithMessageOnly } from '@/types';
import type { AxiosResponse } from 'axios';
const LINK = endpoints['activateAccountWithOtp'];
function mockSetup() {
  mockAdapter.onPost(LINK.url).reply(200, {
    message: 'Account activated!',
  } as ApiResponseWithMessageOnly);
};
if (LINK.isMock) mockSetup();
export type ActivateAccountWithOtpApiParams = {
  username: string;
  optCode: string;
}
export type ActivateAccountWithOtpApiReturns = ApiResponseWithMessageOnly;
export default async function activateAccountWithOtpApi(payload: ActivateAccountWithOtpApiParams): Promise<AxiosResponse<ActivateAccountWithOtpApiReturns>> {
  return !LINK.isMock ? http.post(LINK.url, payload) : httpMock.post(LINK.url, payload);
};
