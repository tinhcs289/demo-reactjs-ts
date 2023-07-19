import authentication from '@/browser/cookies/authentication';
import userPermissions from '@/browser/localStorage/userPermissions';
import userProfile from '@/browser/localStorage/userProfile';
import userRoles from '@/browser/localStorage/userRoles';
import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { AuthenticationJWT, AuthenticationUserInfo, UserProfile } from '@/types';
import Immutable from 'seamless-immutable';
export const rootName = 'authentication';
export type State = {
  token: AuthenticationJWT | null;
  user: UserProfile | null;
  roles: Required<AuthenticationUserInfo['roles']> | null;
  policies: Required<AuthenticationUserInfo['policies']> | null;
  loginRequestStatus: EApiRequestStatus;
  logoutRequestStatus: EApiRequestStatus;
  verifyTokenRequestStatus: EApiRequestStatus;
  refreshTokenRequestStatus: EApiRequestStatus;
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
  loginRequestStatus: EApiRequestStatus.NONE,
  logoutRequestStatus: EApiRequestStatus.NONE,
  verifyTokenRequestStatus: EApiRequestStatus.NONE,
  refreshTokenRequestStatus: EApiRequestStatus.NONE,
});
export default state;
