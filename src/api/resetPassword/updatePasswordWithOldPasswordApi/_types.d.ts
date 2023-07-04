import type { ApiResponseWithMessageOnly } from '@/types';
export type ApiPayload = {
  username: string;
  currentPassword: string;
  newPassword: string;
  newPasswordReEnterd: string;
};
export type ApiReturns = ApiResponseWithMessageOnly;
