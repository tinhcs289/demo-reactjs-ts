import authentication from '@/appCookies/authentication';
import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { AuthenticationJWT, AuthenticationUserInfo } from '@/types';
import Immutable from 'seamless-immutable';
export const rootName = 'authentication';
export type State = {
  token: AuthenticationJWT | null;
  user: AuthenticationUserInfo | null;
  loginRequestStatus: EApiRequestStatus;
  logoutRequestStatus: EApiRequestStatus;
  verifyTokenRequestStatus: EApiRequestStatus;
  refreshTokenRequestStatus: EApiRequestStatus;
};
const tokenInfo = authentication.get();
const state = Immutable<State>({
  token: tokenInfo || null,
  user: null,
  loginRequestStatus: EApiRequestStatus.NONE,
  logoutRequestStatus: EApiRequestStatus.NONE,
  verifyTokenRequestStatus: EApiRequestStatus.NONE,
  refreshTokenRequestStatus: EApiRequestStatus.NONE,
});
export default state;
