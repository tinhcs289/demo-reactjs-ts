import { mockAdapter } from '@/api/httpMock';
import type { ApiReturns } from './_types';
import { LINK } from './constants';
export default function mock() {
  mockAdapter.onPost(LINK.url).reply(200, {
    message: 'Account created!',
  } as ApiReturns);
}
