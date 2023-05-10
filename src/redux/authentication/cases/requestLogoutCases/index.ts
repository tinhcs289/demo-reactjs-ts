import clearStatusOfRequestLogout from './clearStatusOfRequestLogout';
import requestLogout from './requestLogout';
import requestLogoutFail from './requestLogoutFail';
import requestLogoutSuccess from './requestLogoutSuccess';
export const cases = [
  clearStatusOfRequestLogout,
  requestLogout,
  requestLogoutFail,
  requestLogoutSuccess,
];
export const actions = {
  requestLogout: requestLogout.action,
  requestLogoutFail: requestLogoutFail.action,
  requestLogoutSuccess: requestLogoutSuccess.action,
  clearStatusOfRequestLogout: clearStatusOfRequestLogout.action,
};