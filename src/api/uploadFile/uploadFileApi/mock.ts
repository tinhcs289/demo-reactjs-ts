import { mockAdapter } from '@/api/_axios';
import type { ApiReturns } from './_types';
import { LINK } from './constants';
export default function mock() {
  mockAdapter.onPost(LINK.url).reply(200, {
    message:
      'https://media.doanhnghiepvn.vn/Images/Uploaded/Share/2022/08/22/Quynh-Kool-xinh-dep-the-nay-bao-sao-dan-nguoi-tinh-man-anh-deu-la-nam-than_1.jpg',
  } as ApiReturns);
}
