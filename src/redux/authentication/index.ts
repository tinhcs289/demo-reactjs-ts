import { createReducer } from '@/helpers/reduxHelpers';
import state, { rootName } from './state';
//#region import cases
import clearStatusOfRequestLogin from './cases/clearStatusOfRequestLogin';
import clearStatusOfRequestLogout from './cases/clearStatusOfRequestLogout';
import requestLogin from './cases/requestLogin';
import requestLoginFail from './cases/requestLoginFail';
import requestLoginSuccess from './cases/requestLoginSuccess';
import requestLogout from './cases/requestLogout';
import requestLogoutFail from './cases/requestLogoutFail';
import requestLogoutSuccess from './cases/requestLogoutSuccess';
//#endregion
//#region export Selector
export * from './selectors';
export type { State as AuthenticationState } from './state';
//#endregion
//#region export Reducer
export default createReducer(
  rootName,
  state,
  //
  requestLogin,
  requestLoginFail,
  requestLoginSuccess,
  clearStatusOfRequestLogin,
  //
  requestLogout,
  clearStatusOfRequestLogout,
  requestLogoutFail,
  requestLogoutSuccess,
);
//#endregion
//#region export Action
export const actions = {
  requestLogin: requestLogin.action,
  requestLoginSuccess: requestLoginSuccess.action,
  requestLoginFail: requestLoginFail.action,
  clearStatusOfRequestLogin: clearStatusOfRequestLogin.action,
  //
  requestLogout: requestLogout.action,
  clearStatusOfRequestLogout: clearStatusOfRequestLogout.action,
  requestLogoutFail: requestLogoutFail.action,
  requestLogoutSuccess: requestLogoutSuccess.action,
};
//#endregion

