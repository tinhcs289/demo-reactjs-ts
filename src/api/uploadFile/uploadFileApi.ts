import http from '@/api/http';
import httpMock from '@/api/httpMock';
import mockAdapter from '@/api/mockAdapter';
import { ApiResponseWithMessageOnly } from '@/api/_types';
import type { AxiosResponse } from 'axios';
const LINK = '/api/file/upload-single';
const isMock = true;
const mockSetup = () => {
  mockAdapter.onPost(LINK).reply(200, {
    message:
      'https://media.doanhnghiepvn.vn/Images/Uploaded/Share/2022/08/22/Quynh-Kool-xinh-dep-the-nay-bao-sao-dan-nguoi-tinh-man-anh-deu-la-nam-than_1.jpg',
  } as ApiResponseWithMessageOnly);
};

if (isMock) mockSetup();

const uploadFileApi = (payload: {
  folder: string;
  file: File;
}): Promise<AxiosResponse<ApiResponseWithMessageOnly>> => {
  const formData = new FormData();
  formData.append('file', payload.file);

  return !isMock
    ? http.post(`${LINK}/${payload.folder}`, formData)
    : httpMock.post(`${LINK}/${payload.folder}`, formData);
};
export default uploadFileApi;
