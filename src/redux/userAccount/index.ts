import { createReducer } from '@/helpers/reduxHelpers';
import state, { rootName } from './state';
//#region import cases
import clearStatusOfRequestActivateAccountWithOtp from './cases/clearStatusOfRequestActivateAccountWithOtp';
import clearStatusOfRequestCreateOtpForResetPassword from './cases/clearStatusOfRequestCreateOtpForResetPassword';
import clearStatusOfRequestRegisterUserAccount from './cases/clearStatusOfRequestRegisterUserAccount';
import clearStatusOfRequestUpdatePasswordWithOtp from './cases/clearStatusOfRequestUpdatePasswordWithOtp';
import markAsNotBeenActivated from './cases/markAsNotBeenActivated';
import requestActivateAccountWithOtp from './cases/requestActivateAccountWithOtp';
import requestActivateAccountWithOtpFail from './cases/requestActivateAccountWithOtpFail';
import requestActivateAccountWithOtpSuccess from './cases/requestActivateAccountWithOtpSuccess';
import requestCreateOtpForResetPassword from './cases/requestCreateOtpForResetPassword';
import requestCreateOtpForResetPasswordFail from './cases/requestCreateOtpForResetPasswordFail';
import requestCreateOtpForResetPasswordSuccess from './cases/requestCreateOtpForResetPasswordSuccess';
import requestRegisterUserAccount from './cases/requestRegisterUserAccount';
import requestRegisterUserAccountFail from './cases/requestRegisterUserAccountFail';
import requestRegisterUserAccountSuccess from './cases/requestRegisterUserAccountSuccess';
import requestUpdatePasswordWithOtp from './cases/requestUpdatePasswordWithOtp';
import requestUpdatePasswordWithOtpFail from './cases/requestUpdatePasswordWithOtpFail';
import requestUpdatePasswordWithOtpSuccess from './cases/requestUpdatePasswordWithOtpSuccess';
import unMarkAsNotBeenActivated from './cases/unMarkAsNotBeenActivated';
//#endregion
//#region export Selector
export * from './selectors';
export type { State as UserAccountState } from './state';
//#endregion
//#region export Reducer
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
//#endregion
//#region export Action
export const actions = {
  markAsNotBeenActivated: markAsNotBeenActivated.action,
  unMarkAsNotBeenActivated: unMarkAsNotBeenActivated.action,
  //
  requestActivateAccountWithOtp: requestActivateAccountWithOtp.action,
  requestActivateAccountWithOtpSuccess: requestActivateAccountWithOtpSuccess.action,
  requestActivateAccountWithOtpFail: requestActivateAccountWithOtpFail.action,
  clearStatusOfRequestActivateAccountWithOtp: clearStatusOfRequestActivateAccountWithOtp.action,
  //
  requestCreateOtpForResetPassword: requestCreateOtpForResetPassword.action,
  requestCreateOtpForResetPasswordSuccess: requestCreateOtpForResetPasswordSuccess.action,
  requestCreateOtpForResetPasswordFail: requestCreateOtpForResetPasswordFail.action,
  clearStatusOfRequestCreateOtpForResetPassword: clearStatusOfRequestCreateOtpForResetPassword.action,
  //
  requestRegisterUserAccount: requestRegisterUserAccount.action,
  requestRegisterUserAccountSuccess: requestRegisterUserAccountSuccess.action,
  requestRegisterUserAccountFail: requestRegisterUserAccountFail.action,
  clearStatusOfRequestRegisterUserAccount: clearStatusOfRequestRegisterUserAccount.action,
  //
  requestUpdatePasswordWithOtp: requestUpdatePasswordWithOtp.action,
  requestUpdatePasswordWithOtpSuccess: requestUpdatePasswordWithOtpSuccess.action,
  requestUpdatePasswordWithOtpFail: requestUpdatePasswordWithOtpFail.action,
  clearStatusOfRequestUpdatePasswordWithOtp: clearStatusOfRequestUpdatePasswordWithOtp.action,
};
//#endregion