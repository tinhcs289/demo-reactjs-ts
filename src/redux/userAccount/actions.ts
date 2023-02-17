//#region import cases
import markAsNotBeenActivated, { unMarkAsNotBeenActivated } from './cases/markAsNotBeenActivated';
import requestActivateAccountWithOtp, {
  clearStatusOfRequestActivateAccountWithOtp,
  requestActivateAccountWithOtpFail,
  requestActivateAccountWithOtpSuccess
} from './cases/requestActivateAccountWithOtp';
import requestCreateOtpForResetPassword, {
  clearStatusOfRequestCreateOtpForResetPassword,
  requestCreateOtpForResetPasswordFail,
  requestCreateOtpForResetPasswordSuccess
} from './cases/requestCreateOtpForResetPassword';
import requestRegisterUserAccount, {
  clearStatusOfRequestRegisterUserAccount,
  requestRegisterUserAccountFail,
  requestRegisterUserAccountSuccess
} from './cases/requestRegisterUserAccount';
import requestUpdatePasswordWithOtp, {
  clearStatusOfRequestUpdatePasswordWithOtp,
  requestUpdatePasswordWithOtpFail,
  requestUpdatePasswordWithOtpSuccess
} from './cases/requestUpdatePasswordWithOtp';
//#endregion
const actions = {
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
export default actions;