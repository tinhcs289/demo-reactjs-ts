import clearStatusOfRequestUpdatePasswordWithOtp from './clearStatusOfRequestUpdatePasswordWithOtp';
import requestUpdatePasswordWithOtp from './requestUpdatePasswordWithOtp';
import requestUpdatePasswordWithOtpFail from './requestUpdatePasswordWithOtpFail';
import requestUpdatePasswordWithOtpSuccess from './requestUpdatePasswordWithOtpSuccess';
export const cases = [
  requestUpdatePasswordWithOtp,
  requestUpdatePasswordWithOtpSuccess,
  requestUpdatePasswordWithOtpFail,
  clearStatusOfRequestUpdatePasswordWithOtp,
];
export const actions = {
  requestUpdatePasswordWithOtp: requestUpdatePasswordWithOtp.action,
  requestUpdatePasswordWithOtpSuccess: requestUpdatePasswordWithOtpSuccess.action,
  requestUpdatePasswordWithOtpFail: requestUpdatePasswordWithOtpFail.action,
  clearStatusOfRequestUpdatePasswordWithOtp: clearStatusOfRequestUpdatePasswordWithOtp.action,
};
