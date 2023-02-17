import { createReducer } from '@/helpers/reduxHelpers';
import state, { rootName } from './state';
//#region import cases
import requestLogin, { clearStatusOfRequestLogin, requestLoginFail, requestLoginSuccess } from './cases/requestLogin';
import requestLogout, { clearStatusOfRequestLogout, requestLogoutFail, requestLogoutSuccess } from './cases/requestLogout';
//#endregion
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
export { default as actions } from './actions';
export * from './selectors';

