import authentication from '@/browser/cookies/authentication';
import userPermissions from '@/browser/localStorage/userPermissions';
import userProfile from '@/browser/localStorage/userProfile';
import userRoles from '@/browser/localStorage/userRoles';
import { HttpRequestStatus } from '@/constants/apiRequestStatus';
import type { AuthenticationJWT, AuthenticationUserInfo, UserProfile } from '@/types';
import Immutable from 'seamless-immutable';
export const rootName = 'authentication';
export type State = {
  token: AuthenticationJWT | null;
  user: UserProfile | null;
  roles: Required<AuthenticationUserInfo['roles']> | null;
  policies: Required<AuthenticationUserInfo['policies']> | null;
  loginRequestStatus: HttpRequestStatus;
  logoutRequestStatus: HttpRequestStatus;
  verifyTokenRequestStatus: HttpRequestStatus;
  refreshTokenRequestStatus: HttpRequestStatus;
};
const tokenInfo = authentication.get();
const policies = userPermissions.get();
const roles = userRoles.get();
const user = userProfile.get();
const state = Immutable<State>({
  token: tokenInfo || null,
  user: {
    id: '',
    username: '',
    displayname: '',
    firstName: '',
    middleName: '',
    lastName: '',
    avatar: '',
    email: '',
    phone: '',
    ...user,
  },
  roles: roles || [],
  policies: policies || [],
  loginRequestStatus: HttpRequestStatus.NONE,
  logoutRequestStatus: HttpRequestStatus.NONE,
  verifyTokenRequestStatus: HttpRequestStatus.NONE,
  refreshTokenRequestStatus: HttpRequestStatus.NONE,
});
export default state;
