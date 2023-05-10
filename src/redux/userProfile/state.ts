import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { AuthenticationUserInfo } from '@/types';
import Immutable from 'seamless-immutable';
export type State = {
  data: AuthenticationUserInfo | null;
  getUserProfileRequestStatus: EApiRequestStatus;
  updateUserProfileRequestStatus: EApiRequestStatus;
};
export const rootName = 'userProfile';
const state = Immutable<State>({
  data: null,
  getUserProfileRequestStatus: EApiRequestStatus.NONE,
  updateUserProfileRequestStatus: EApiRequestStatus.NONE,
});
export default state;
export type NextState = typeof state;
