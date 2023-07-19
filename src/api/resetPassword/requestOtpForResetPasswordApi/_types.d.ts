import type { ApiResponseWithMessageOnly } from '@/types';
export type ApiPayload = {
  username: string;
  contactType: 'email' | 'sms' | 'phone';
  contact?: string;
};
export type ApiReturns = ApiResponseWithMessageOnly;
