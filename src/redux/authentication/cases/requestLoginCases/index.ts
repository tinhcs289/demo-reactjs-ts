import clearStatusOfRequestLogin from './clearStatusOfRequestLogin';
import requestLogin from './requestLogin';
import requestLoginFail from './requestLoginFail';
import requestLoginSuccess from './requestLoginSuccess';
export const cases = [
  clearStatusOfRequestLogin,
  requestLogin,
  requestLoginFail,
  requestLoginSuccess,
];
export const actions = {
  requestLogin: requestLogin.action,
  requestLoginFail: requestLoginFail.action,
  requestLoginSuccess: requestLoginSuccess.action,
  clearStatusOfRequestLogin: clearStatusOfRequestLogin.action,
};