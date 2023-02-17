import type { ReduxStore } from '@/helpers/reduxHelpers';
import { createRootSelector } from '@/helpers/reduxHelpers';
import type { State } from './state';
import { rootName } from './state';
export const rootSelector = createRootSelector<State>(rootName);
export function hasNotBeenActivatedSelector(state: ReduxStore) {
  return rootSelector(state)?.hasNotBeenActivated;
};
export function accoutNeedToBeActivatedSelector(state: ReduxStore) {
  return rootSelector(state)?.accoutNeedToBeActivated;
};
export function registerUserAccountRequestStatusSelector(state: ReduxStore) {
  return rootSelector(state)?.registerUserAccountRequestStatus;
};
export function activateAccountWithOtpRequestStatusSelector(state: ReduxStore) {
  return rootSelector(state)?.activateAccountWithOtpRequestStatus;
};
export function createOtpForResetPasswordRequestStatusSelector(state: ReduxStore) {
  return rootSelector(state)?.createOtpForResetPasswordRequestStatus;
};
export function updatePasswordWithOptSelector(state: ReduxStore) {
  return rootSelector(state)?.updatePasswordWithOpt;
};