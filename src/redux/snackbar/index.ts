import { createReducer } from '@/helpers/reduxHelpers';
import state, { rootName } from './state';
//#region import cases
import pushMessage from './cases/pushMessage';
import pushMessageError from './cases/pushMessageError';
import pushMessageInfo from './cases/pushMessageInfo';
import clearMessageState from './cases/clearMessageState';
//#endregion
export default createReducer(
  rootName,
  state,
  //
  pushMessage,
  pushMessageError,
  pushMessageInfo,
  clearMessageState,
);
export { default as actions } from './actions';
export * from './selectors';

