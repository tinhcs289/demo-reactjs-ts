import clearStatusOfRequestCreateOtpForResetPassword from './clearStatusOfRequestCreateOtpForResetPassword';
import requestCreateOtpForResetPassword from './requestCreateOtpForResetPassword';
import requestCreateOtpForResetPasswordFail from './requestCreateOtpForResetPasswordFail';
import requestCreateOtpForResetPasswordSuccess from './requestCreateOtpForResetPasswordSuccess';
export const cases = [
  clearStatusOfRequestCreateOtpForResetPassword,
  requestCreateOtpForResetPassword,
  requestCreateOtpForResetPasswordFail,
  requestCreateOtpForResetPasswordSuccess,
];
export const actions = {
  requestCreateOtpForResetPassword: requestCreateOtpForResetPassword.action,
  requestCreateOtpForResetPasswordSuccess: requestCreateOtpForResetPasswordSuccess.action,
  requestCreateOtpForResetPasswordFail: requestCreateOtpForResetPasswordFail.action,
  clearStatusOfRequestCreateOtpForResetPassword: clearStatusOfRequestCreateOtpForResetPassword.action,
};
