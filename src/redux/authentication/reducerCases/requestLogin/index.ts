import requestLogin from './requestLogin';
import clearStatusOfRequestLogin from './requestLogin.clear';
import requestLoginFail from './requestLogin.fail';
import requestLoginSuccess from './requestLogin.success';
export const cases = [clearStatusOfRequestLogin, requestLogin, requestLoginFail, requestLoginSuccess];
export const actions = {
  requestLogin: requestLogin.action,
  requestLoginFail: requestLoginFail.action,
  requestLoginSuccess: requestLoginSuccess.action,
  clearStatusOfRequestLogin: clearStatusOfRequestLogin.action,
};
