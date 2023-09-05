import { createReducer } from '@/helpers/reduxHelpers';
import state, { rootName } from './state';
//#region import cases
import clearMessageState from './reducerCases/clearMessageState';
import pushMessage from './reducerCases/pushMessage';
import pushMessageError from './reducerCases/pushMessageError';
import pushMessageInfo from './reducerCases/pushMessageInfo';
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
