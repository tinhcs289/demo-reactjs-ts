import { createReducer } from '@/helpers/reduxHelpers';
import state, { rootName } from './state';
//#region import cases
import * as markAsNotBeenActivated from './cases/markAsNotBeenActivatedCases';
import * as requestActivateAccountWithOtp from './cases/requestActivateAccountWithOtpCases';
import * as requestCreateOtpForResetPassword from './cases/requestCreateOtpForResetPasswordCases';
import * as requestRegisterUserAccount from './cases/requestRegisterUserAccountCases';
import * as requestUpdatePasswordWithOldPassword from './cases/requestUpdatePasswordWithOldPasswordCases';
import * as requestUpdatePasswordWithOtp from './cases/requestUpdatePasswordWithOtpCases';
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
  ...markAsNotBeenActivated.cases,
  ...requestActivateAccountWithOtp.cases,
  ...requestCreateOtpForResetPassword.cases,
  ...requestRegisterUserAccount.cases,
  ...requestUpdatePasswordWithOldPassword.cases,
  ...requestUpdatePasswordWithOtp.cases
);
//#endregion
//#region export Action
export const actions = {
  ...markAsNotBeenActivated.actions,
  ...requestActivateAccountWithOtp.actions,
  ...requestCreateOtpForResetPassword.actions,
  ...requestRegisterUserAccount.actions,
  ...requestUpdatePasswordWithOldPassword.actions,
  ...requestUpdatePasswordWithOtp.actions,
};
//#endregion
