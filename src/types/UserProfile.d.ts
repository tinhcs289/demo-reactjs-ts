import type { AuthenticationUserInfo } from '@/types/Authentication';
export type UserProfile = Omit<AuthenticationUserInfo, 'roles' | 'policies'>;
