import { createReducer } from '@/helpers/reduxHelpers';
import state, { rootName } from './state';
//#region import cases
import * as requestUserProfile from './cases/requestUserProfileCases';
import * as requestUpdateUserProfile from './cases/requestUpdateUserProfileCases';
//#endregion
//#region export Selector
export * from './selectors';
export type { State as UserProfileState } from './state';
//#endregion
//#region export Reducer
export default createReducer(
  rootName,
  state,
  //
  ...requestUserProfile.cases,
  ...requestUpdateUserProfile.cases
);
//#endregion
//#region export Action
export const actions = {
  ...requestUserProfile.actions,
  ...requestUpdateUserProfile.actions,
};
//#endregion
