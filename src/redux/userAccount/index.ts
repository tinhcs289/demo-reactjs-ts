import { createReducer } from '@/helpers/reduxHelpers';
import state, { rootName } from './state';
//#region import cases
import * as markAsNotBeenActivated from './reducerCases/markAsNotBeenActivatedCases';
import * as requestActivateAccountWithOtp from './reducerCases/requestActivateAccountWithOtpCases';
import * as requestCreateOtpForResetPassword from './reducerCases/requestCreateOtpForResetPasswordCases';
import * as requestRegisterUserAccount from './reducerCases/requestRegisterUserAccountCases';
import * as requestUpdatePasswordWithOldPassword from './reducerCases/requestUpdatePasswordWithOldPasswordCases';
import * as requestUpdatePasswordWithOtp from './reducerCases/requestUpdatePasswordWithOtpCases';
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
