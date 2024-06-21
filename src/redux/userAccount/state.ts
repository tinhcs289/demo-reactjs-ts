import { HttpRequestStatus } from '@/constants/apiRequestStatus';
import Immutable from 'seamless-immutable';
export type State = {
  hasNotBeenActivated: boolean | null;
  accoutNeedToBeActivated: string | null;
  registerUserAccountRequestStatus: HttpRequestStatus;
  activateAccountWithOtpRequestStatus: HttpRequestStatus;
  createOtpForResetPasswordRequestStatus: HttpRequestStatus;
  updatePasswordWithOptRequestStatus: HttpRequestStatus;
  updatePasswordWithOldPasswordRequestStatus: HttpRequestStatus;
};
export const rootName = 'userAccount';
const state = Immutable<State>({
  hasNotBeenActivated: null,
  accoutNeedToBeActivated: null,
  registerUserAccountRequestStatus: HttpRequestStatus.NONE,
  activateAccountWithOtpRequestStatus: HttpRequestStatus.NONE,
  createOtpForResetPasswordRequestStatus: HttpRequestStatus.NONE,
  updatePasswordWithOptRequestStatus: HttpRequestStatus.NONE,
  updatePasswordWithOldPasswordRequestStatus: HttpRequestStatus.NONE,
});
export default state;
