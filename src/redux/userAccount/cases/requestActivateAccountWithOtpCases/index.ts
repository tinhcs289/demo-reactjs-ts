import clearStatusOfRequestActivateAccountWithOtp from './clearStatusOfRequestActivateAccountWithOtp';
import requestActivateAccountWithOtp from './requestActivateAccountWithOtp';
import requestActivateAccountWithOtpFail from './requestActivateAccountWithOtpFail';
import requestActivateAccountWithOtpSuccess from './requestActivateAccountWithOtpSuccess';
export const cases = [
  clearStatusOfRequestActivateAccountWithOtp,
  requestActivateAccountWithOtp,
  requestActivateAccountWithOtpFail,
  requestActivateAccountWithOtpSuccess,
];
export const actions = {
  requestActivateAccountWithOtp: requestActivateAccountWithOtp.action,
  requestActivateAccountWithOtpSuccess: requestActivateAccountWithOtpSuccess.action,
  requestActivateAccountWithOtpFail: requestActivateAccountWithOtpFail.action,
  clearStatusOfRequestActivateAccountWithOtp: clearStatusOfRequestActivateAccountWithOtp.action,
};