import type { ReduxStore } from '@/helpers/reduxHelpers';
import { createRootSelector } from '@/helpers/reduxHelpers';
import type { State } from './state';
import { rootName } from './state';
export const rootSelector = createRootSelector<State>(rootName);
export function isSessionTimeoutSelector(state: ReduxStore) {
  return rootSelector(state)?.isSessionTimeout;
}
export function isSessionChangeSelector(state: ReduxStore) {
  return rootSelector(state)?.isSessionChange;
}
export function isSessionChangeToLoggedInSelector(state: ReduxStore) {
  return rootSelector(state)?.isSessionChangeToLoggedIn;
}
export function isSessionChangeToLoggedOutSelector(state: ReduxStore) {
  return rootSelector(state)?.isSessionChangeToLoggedOut;
}
