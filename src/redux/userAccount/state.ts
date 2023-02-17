import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import Immutable from 'seamless-immutable';
export type State = {
  hasNotBeenActivated: boolean | null;
  accoutNeedToBeActivated: string | null;
  registerUserAccountRequestStatus: EApiRequestStatus;
  activateAccountWithOtpRequestStatus: EApiRequestStatus;
  createOtpForResetPasswordRequestStatus: EApiRequestStatus;
  updatePasswordWithOpt: EApiRequestStatus;
};
export const rootName = 'userAccount';
const state = Immutable<State>({
  hasNotBeenActivated: null,
  accoutNeedToBeActivated: null,
  registerUserAccountRequestStatus: EApiRequestStatus.NONE,
  activateAccountWithOtpRequestStatus: EApiRequestStatus.NONE,
  createOtpForResetPasswordRequestStatus: EApiRequestStatus.NONE,
  updatePasswordWithOpt: EApiRequestStatus.NONE,
});
export default state;
