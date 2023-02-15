import authentication from '@/appCookies/authentication';
import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { TAuthenticationJWT, TAuthenticationUserInfo } from '@/types';
import Immutable from 'seamless-immutable';
export type State = {
  token: TAuthenticationJWT | null;
  user: TAuthenticationUserInfo | null;
  loginRequestStatus: EApiRequestStatus;
  logoutRequestStatus: EApiRequestStatus;
  verifyTokenRequestStatus: EApiRequestStatus;
  refreshTokenRequestStatus: EApiRequestStatus;
};
const tokenInfo = authentication.get();
export const rootName = 'authentication';
const state = Immutable<State>({
  token: tokenInfo || null,
  user: null,
  loginRequestStatus: EApiRequestStatus.NONE,
  logoutRequestStatus: EApiRequestStatus.NONE,
  verifyTokenRequestStatus: EApiRequestStatus.NONE,
  refreshTokenRequestStatus: EApiRequestStatus.NONE,
});
export default state;
