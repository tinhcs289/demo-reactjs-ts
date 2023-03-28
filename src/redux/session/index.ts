import { createReducer } from '@/helpers/reduxHelpers';
import state, { rootName } from './state';
//#region import cases
import sessionTimeoutWarningHide from './cases/sessionTimeoutWarningHide';
import sessionTimeoutWarningShow from './cases/sessionTimeoutWarningShow';
//#endregion
//#region export Selector
export * from './selectors';
export type { State as SessionState } from './state';
//#endregion
//#region export Reducer
export default createReducer(
  rootName,
  state,
  //
  sessionTimeoutWarningHide,
  sessionTimeoutWarningShow,
);
//#endregion
//#region export Action
export const actions = {
  sessionTimeoutWarningHide: sessionTimeoutWarningHide.action,
  sessionTimeoutWarningShow: sessionTimeoutWarningShow.action,
};
//#endregion

