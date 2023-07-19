import { createReducer } from '@/helpers/reduxHelpers';
import state, { rootName } from './state';
//#region import cases
import * as requestLogin from './cases/requestLoginCases';
import * as requestLogout from './cases/requestLogoutCases';
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
  ...requestLogin.cases,
  ...requestLogout.cases
);
//#endregion
//#region export Action
export const actions = {
  ...requestLogin.actions,
  ...requestLogout.actions,
};
//#endregion
