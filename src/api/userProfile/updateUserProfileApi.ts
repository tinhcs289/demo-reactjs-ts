import http from '@/api/http';
import httpMock, { mockAdapter } from '@/api/httpMock';
import endpoints from '@/constants/endpoints';
import type { ApiResponseWithMessageOnly, AuthenticationUserInfo } from '@/types';
import type { AxiosResponse } from 'axios';
const LINK = endpoints['updateUserProfile'];
export type UpdateUserProfileApiReturns = ApiResponseWithMessageOnly;
export type UpdateUserProfileApiParams = AuthenticationUserInfo;
function mockSetup() {
  mockAdapter.onPut(LINK.url).reply(200, {
    message: 'Profile updated!',
  } as UpdateUserProfileApiReturns);
};
if (LINK.isMock) mockSetup();
export default async function updateUserProfileApi(payload: AuthenticationUserInfo): Promise<AxiosResponse<UpdateUserProfileApiReturns>> {
  return !LINK.isMock ? http.put(LINK.url, payload) : httpMock.put(LINK.url, payload);
};