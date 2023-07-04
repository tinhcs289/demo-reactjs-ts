import { mockAdapter } from '@/api/httpMock';
import type { ApiReturns } from './_types';
import { LINK } from './constants';
export default function mock() {
  mockAdapter.onGet(LINK.url).reply(200, {
    jwt: {
      accessToken:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1laWQiOiIxMTY0IiwidW5pcXVlX25hbWUiOiJ0aW5oY3NAc29mdGNvbS52biIsImp0aSI6IjNiNGRkNWQ1LWI2YjEtNDhhNS05ZDgxLTJlZWFkNDhkMzVmMSIsInRlbmFudGlkIjoiNCIsInRlbmFudHdnaWQiOiIwIiwidXNlcnRlbmFudGlkIjoiMzE5NWFmNGYtODhiNS00NGYyLTgwMTAtMTY2NDkwZDIyYjllIiwiZGlzcGxheW5hbWUiOiJDYW8gU8ahbiAgVOG7i25oIDU0NSIsImF2YXRhciI6Ii8zMDA2ODg2MTMtNTM2NzMxNDgxMzMyMjM1NC00ODk1ODAwMTYzNDkyMDEwOTc0LW5fMTY2MTgzMDQwNC5qcGciLCJ0eXBlIjoiMSIsInJlZ2lvbiI6IlZOIiwibGFuZyI6InZpLVZOIiwiaXNzIjoiT3BlblZuSWQiLCJhdWQiOiI0MTRlMTkyN2EzODg0ZjY4YWJjNzlmNzI4MzgzN2ZkMSIsImV4cCI6MTY2MTk2MDIyNCwibmJmIjoxNjYxOTE3MDI0fQ.co-LP2900UAuEzvOfcpcEp2EW_qe14UZrwyjJ1KOZ84',
      expires: 864000000,
      refreshToken: '1164_1_4_3b798ca5-39b0-437e-8d75-304992a7fb48',
    },
    user: {
      id: '3195af4f-88b5-44f2-8010-166490d22b9e',
      avatar:
        'https://media.doanhnghiepvn.vn/Images/Uploaded/Share/2022/08/22/Quynh-Kool-xinh-dep-the-nay-bao-sao-dan-nguoi-tinh-man-anh-deu-la-nam-than_1.jpg',
      username: 'annv@gmail.com',
      displayname: 'Nguyễn Văn An',
      firstName: 'Nguyễn',
      middleName: 'Văn',
      lastName: 'An',
      language: 'vi-VN',
    },
  } as ApiReturns);
}
