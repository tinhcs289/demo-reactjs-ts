import { createReducer } from '@/helpers/reduxHelpers';
import state, { rootName } from './state';
//#region import cases
import markAsNotBeenActivated, { unMarkAsNotBeenActivated } from './cases/markAsNotBeenActivated';
import requestActivateAccountWithOtp, {
  clearStatusOfRequestActivateAccountWithOtp,
  requestActivateAccountWithOtpFail,
  requestActivateAccountWithOtpSuccess,
} from './cases/requestActivateAccountWithOtp';
import requestCreateOtpForResetPassword, {
  clearStatusOfRequestCreateOtpForResetPassword,
  requestCreateOtpForResetPasswordFail,
  requestCreateOtpForResetPasswordSuccess,
} from './cases/requestCreateOtpForResetPassword';
import requestRegisterUserAccount, {
  clearStatusOfRequestRegisterUserAccount,
  requestRegisterUserAccountFail,
  requestRegisterUserAccountSuccess,
} from './cases/requestRegisterUserAccount';
import requestUpdatePasswordWithOtp, {
  clearStatusOfRequestUpdatePasswordWithOtp,
  requestUpdatePasswordWithOtpFail,
  requestUpdatePasswordWithOtpSuccess,
} from './cases/requestUpdatePasswordWithOtp';
//#endregion
export default createReducer(
  rootName,
  state,
  //
  markAsNotBeenActivated,
  unMarkAsNotBeenActivated,
  //
  requestActivateAccountWithOtp,
  requestActivateAccountWithOtpSuccess,
  requestActivateAccountWithOtpFail,
  clearStatusOfRequestActivateAccountWithOtp,
  //
  requestCreateOtpForResetPassword,
  requestCreateOtpForResetPasswordSuccess,
  requestCreateOtpForResetPasswordFail,
  clearStatusOfRequestCreateOtpForResetPassword,
  //
  requestRegisterUserAccount,
  requestRegisterUserAccountSuccess,
  requestRegisterUserAccountFail,
  clearStatusOfRequestRegisterUserAccount,
  //
  requestUpdatePasswordWithOtp,
  requestUpdatePasswordWithOtpSuccess,
  requestUpdatePasswordWithOtpFail,
  clearStatusOfRequestUpdatePasswordWithOtp,
);
export { default as actions } from './actions';
export * from './selectors';

