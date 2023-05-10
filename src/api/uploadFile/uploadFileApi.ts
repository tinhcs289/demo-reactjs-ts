import http from '@/api/http';
import httpMock, { mockAdapter } from '@/api/httpMock';
import endpoints from '@/constants/endpoints';
import { ApiResponseWithMessageOnly } from '@/types';
import type { AxiosResponse } from 'axios';
const LINK = endpoints['uploadFile'];
function mockSetup() {
  mockAdapter.onPost(LINK.url).reply(200, {
    message:
      'https://media.doanhnghiepvn.vn/Images/Uploaded/Share/2022/08/22/Quynh-Kool-xinh-dep-the-nay-bao-sao-dan-nguoi-tinh-man-anh-deu-la-nam-than_1.jpg',
  } as ApiResponseWithMessageOnly);
};
if (LINK.isMock) mockSetup();
export type UploadFileApiParams = {
  folder: string;
  file: File;
};
export type UploadFileApiReturns = ApiResponseWithMessageOnly;
export default async function uploadFileApi(payload: UploadFileApiParams): Promise<AxiosResponse<UploadFileApiReturns>> {
  const formData = new FormData();
  formData.append('file', payload.file);
  return !LINK.isMock
    ? http.post(`${LINK.url}/${payload.folder}`, formData)
    : httpMock.post(`${LINK.url}/${payload.folder}`, formData);
};
