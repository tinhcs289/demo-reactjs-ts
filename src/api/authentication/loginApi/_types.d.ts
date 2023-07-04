import type { Authentication } from '@/types';
export type ApiPayload = {
  username: string;
  password: string;
};
export type ApiReturns = Authentication;
