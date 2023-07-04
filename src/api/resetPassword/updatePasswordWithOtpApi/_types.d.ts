import type { ApiResponseWithMessageOnly } from '@/types';
export type ApiPayload = {
  username: string;
  otpCode: string;
  newPassword: string;
  newPasswordReEnterd: string;
};
export type ApiReturns = ApiResponseWithMessageOnly;
