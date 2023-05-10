import http from '@/api/http';
import httpMock, { mockAdapter } from '@/api/httpMock';
import endpoints from '@/constants/endpoints';
import { ApiResponseWithMessageOnly } from '@/types';
import type { AxiosResponse } from 'axios';
const LINK = endpoints['updatePasswordWithOldPassword'];
function mockSetup() {
  mockAdapter.onPut(LINK.url).reply(200, {
    message: 'Password updated!',
  } as ApiResponseWithMessageOnly);
};
if (LINK.isMock) mockSetup();
export type UpdatePasswordWithOldPasswordApiParams = {
  username: string;
  currentPassword: string;
  newPassword: string;
  newPasswordReEnterd: string;
}
export type UpdatePasswordWithOldPasswordApiReturns = ApiResponseWithMessageOnly;
export default async function updatePasswordWithOldPasswordApi(
  payload: UpdatePasswordWithOldPasswordApiParams
): Promise<AxiosResponse<UpdatePasswordWithOldPasswordApiReturns>> {
  return !LINK.isMock ? http.put(LINK.url, payload) : httpMock.post(LINK.url, payload);
};
