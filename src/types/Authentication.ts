import type { Permission, Roles } from '@/types/Permission';
export type AuthenticationUserInfo = {
  id: string | number;
  username: string;
  displayname?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  roles?: Roles[];
  polices?: Permission[];
};
export type AuthenticationJWT = {
  accessToken: string;
  refreshToken: string;
  expires: number;
};
export type Authentication = {
  user: AuthenticationUserInfo;
  jwt: AuthenticationJWT;
  hasNotBeenActivated?: boolean;
};
