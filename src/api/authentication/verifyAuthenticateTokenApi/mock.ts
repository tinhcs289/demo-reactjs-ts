import { mockAdapter } from '@/api/httpMock';
import type { ApiReturns } from './_types';
import { LINK } from './constants';
export default function mock() {
  mockAdapter.onGet(LINK.url).reply(200, {
    message: 'Valid token!',
  } as ApiReturns);
}
