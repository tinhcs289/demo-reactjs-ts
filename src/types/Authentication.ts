import { AnyObject } from '@/types/AnyObject';
import type { Permission, Roles } from '@/types/Permission';
export type AuthenticationUserInfo = {
  id: string | number;
  username: string | null;
  displayname?: string | null;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  avatar?: string | null;
  email?: string | null;
  phone?: string | null;
  roles?: Roles[] | null;
  policies?: Permission[] | null;
  orginalData?: AnyObject | null;
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
