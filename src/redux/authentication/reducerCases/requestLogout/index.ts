import requestLogout from './requestLogout';
import clearStatusOfRequestLogout from './requestLogout.clear';
import requestLogoutFail from './requestLogout.fail';
import requestLogoutSuccess from './requestLogout.success';
export const cases = [clearStatusOfRequestLogout, requestLogout, requestLogoutFail, requestLogoutSuccess];
export const actions = {
  requestLogout: requestLogout.action,
  requestLogoutFail: requestLogoutFail.action,
  requestLogoutSuccess: requestLogoutSuccess.action,
  clearStatusOfRequestLogout: clearStatusOfRequestLogout.action,
};
