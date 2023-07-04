import { mockAdapter } from '@/api/httpMock';
import type { ApiReturns } from './_types';
import { LINK } from './constants';
export default function mock() {
  mockAdapter.onGet(LINK.url).reply(200, {
    id: '3195af4f-88b5-44f2-8010-166490d22b9e',
    avatar:
      'https://media.doanhnghiepvn.vn/Images/Uploaded/Share/2022/08/22/Quynh-Kool-xinh-dep-the-nay-bao-sao-dan-nguoi-tinh-man-anh-deu-la-nam-than_1.jpg',
    username: 'annv@gmail.com',
    displayname: 'Nguyễn Văn An',
    firstName: 'Nguyễn',
    middleName: 'Văn',
    lastName: 'An',
    language: 'vi-VN',
  } as ApiReturns);
}
