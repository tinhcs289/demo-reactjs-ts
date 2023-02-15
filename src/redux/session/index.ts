import { createReducer } from '@/helpers/reduxHelpers';
import state, { rootName } from './state';
//#region import cases
import sessionTimeoutWarningHide from './cases/sessionTimeoutWarningHide';
import sessionTimeoutWarningShow from './cases/sessionTimeoutWarningShow';
//#endregion
export default createReducer(rootName, state, sessionTimeoutWarningHide, sessionTimeoutWarningShow);
export { default as actions } from './actions';
export * from './selectors';

