import { mockAdapter } from '@/api/_axios';
import type { ApiReturns } from './_types';
import { LINK } from './constants';
export default function mock() {
  mockAdapter.onPost(LINK.url).reply(200, {
    message: 'signed out!',
  } as ApiReturns);
}
