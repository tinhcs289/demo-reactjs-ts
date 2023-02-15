//#region import cases
import requestLogin, { clearStatusOfRequestLogin, requestLoginFail, requestLoginSuccess } from './cases/requestLogin';
import requestLogout, { clearStatusOfRequestLogout, requestLogoutFail, requestLogoutSuccess } from './cases/requestLogout';
//#endregion
const actions = {
  requestLogin: requestLogin.action,
  requestLoginSuccess: requestLoginSuccess.action,
  requestLoginFail: requestLoginFail.action,
  clearStatusOfRequestLogin: clearStatusOfRequestLogin.action,
  requestLogout: requestLogout.action,
  clearStatusOfRequestLogout: clearStatusOfRequestLogout.action,
  requestLogoutFail: requestLogoutFail.action,
  requestLogoutSuccess: requestLogoutSuccess.action,
};
export default actions;