import { createReducer } from '@/helpers/reduxHelpers';
import state, { rootName } from './state';
//#region import cases
import clearMessageState from './cases/clearMessageState';
import pushMessage from './cases/pushMessage';
import pushMessageError from './cases/pushMessageError';
import pushMessageInfo from './cases/pushMessageInfo';
//#endregion
//#region export Selector
export * from './selectors';
export type { State as SnackbarState } from './state';
//#endregion
//#region export Reducer
export default createReducer(
  rootName,
  state,
  //
  pushMessage,
  pushMessageError,
  pushMessageInfo,
  clearMessageState
);
//#endregion
//#region export Action
export const actions = {
  pushMessage: pushMessage.action,
  pushMessageInfo: pushMessageInfo.action,
  pushMessageError: pushMessageError.action,
  clearMessageState: clearMessageState.action,
};
//#endregion
