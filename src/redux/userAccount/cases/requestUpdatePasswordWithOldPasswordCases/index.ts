import clearStatusOfRequestUpdatePasswordWithOldPassword from './clearStatusOfRequestUpdatePasswordWithOldPassword';
import requestUpdatePasswordWithOldPassword from './requestUpdatePasswordWithOldPassword';
import requestUpdatePasswordWithOldPasswordFail from './requestUpdatePasswordWithOldPasswordFail';
import requestUpdatePasswordWithOldPasswordSuccess from './requestUpdatePasswordWithOldPasswordSuccess';
export const cases = [
  clearStatusOfRequestUpdatePasswordWithOldPassword,
  requestUpdatePasswordWithOldPassword,
  requestUpdatePasswordWithOldPasswordFail,
  requestUpdatePasswordWithOldPasswordSuccess,
];
export const actions = {
  requestUpdatePasswordWithOldPassword: requestUpdatePasswordWithOldPassword.action,
  requestUpdatePasswordWithOldPasswordFail: requestUpdatePasswordWithOldPasswordFail.action,
  requestUpdatePasswordWithOldPasswordSuccess: requestUpdatePasswordWithOldPasswordSuccess.action,
  clearStatusOfRequestUpdatePasswordWithOldPassword: clearStatusOfRequestUpdatePasswordWithOldPassword.action,
};
