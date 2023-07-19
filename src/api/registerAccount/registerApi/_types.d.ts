import type { ApiResponseWithMessageOnly } from '@/types';
export type ApiPayload = {
  username: string;
  password: string;
  passwordReEnter: string;
  email?: string;
  phoneNumber?: string;
  receivedActivationOtpVia?: 'email' | 'sms' | 'phone';
  /**
   * stringify value of `Date` with format `YYYY-MM-DD`
   */
  dayOfBirth?: `${number}${number}${number}${number}-${number}${number}-${number}${number}`;
  firstName?: string;
  middleName?: string;
  lastName?: string;
};
export type ApiReturns = ApiResponseWithMessageOnly;
