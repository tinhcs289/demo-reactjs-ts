import type { AuthenticationUserInfo } from '@/types';
export type ApiPayload = { id?: string; accessToken?: string };
export type ApiReturns = Omit<AuthenticationUserInfo, 'roles' | 'policies'>;
