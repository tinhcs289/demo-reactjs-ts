import http from '@/api/http';
import httpMock from '@/api/httpMock';
import type { GetUserProfileApiParams, GetUserProfileApiReturns } from '@/api/userProfile/getUserProfileApi';
import getUserProfileApi from '@/api/userProfile/getUserProfileApi';
import tryDo from '@/helpers/asyncHelpers/tryDo';
import type { AxiosResponse } from 'axios';
import { ApiPayload, ApiReturns } from './_types';
import { LINK } from './constants';
import { migratePayload, migrateResponseData } from './migrate';
import mock from './mock';
if (LINK.isMock) mock();
export default async function api(payload: ApiPayload): Promise<AxiosResponse<ApiReturns>> {
  if (LINK.isMock) {
    const response = await httpMock.post(LINK.url, payload);
    //@ts-ignore
    response['originalData'] = response.data;
    const getProfilePayload: GetUserProfileApiParams = {
      id: `${response.data.user.id}`,
      accessToken: response.data.jwt.accessToken,
    };
    const response2 = await getUserProfileApi(getProfilePayload);
    response.data = { ...response.data, user: { ...response.data.user, ...response2.data } };
    return response;
  }
  // request Login
  const migratedPayload = migratePayload(payload);
  const [error, response] = await tryDo<AxiosResponse>(http.post(LINK.url, migratedPayload));
  if (error) return error as AxiosResponse<ApiReturns>;
  if (!response) return response as unknown as AxiosResponse<ApiReturns>;
  if (!response?.data) return response as AxiosResponse<ApiReturns>;
  //@ts-ignore
  response['originalData'] = response.data;
  const migratedData = migrateResponseData(response?.data);
  response.data = migratedData;
  if (!migratedData?.user?.id || !migratedData?.jwt?.accessToken) return response;
  // get User Profile
  const getProfilePayload: GetUserProfileApiParams = {
    id: `${migratedData.user.id}`,
    accessToken: migratedData.jwt.accessToken,
  };
  const [error2, profileData] = await tryDo<AxiosResponse<GetUserProfileApiReturns>>(
    getUserProfileApi(getProfilePayload)
  );
  if (error2) return response;
  if (!profileData) return response;
  if (!profileData?.data) return response;
  response.data = { ...migratedData, user: { ...migratedData.user, ...profileData.data } };
  return response as AxiosResponse<ApiReturns>;
}
