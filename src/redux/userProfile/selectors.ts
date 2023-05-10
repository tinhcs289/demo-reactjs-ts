import type { ReduxStore } from '@/helpers/reduxHelpers';
import { createRootSelector } from '@/helpers/reduxHelpers';
import type { State } from './state';
import { rootName } from './state';
export const rootSelector = createRootSelector<State>(rootName);
export function userProfileDataSelector(state: ReduxStore) {
  return rootSelector(state)?.data;
};
export function getUserProfileRequestStatusSelector(state: ReduxStore) {
  return rootSelector(state)?.getUserProfileRequestStatus;
};
export function updateUserProfileRequestStatusSelector(state: ReduxStore) {
  return rootSelector(state)?.updateUserProfileRequestStatus;
};