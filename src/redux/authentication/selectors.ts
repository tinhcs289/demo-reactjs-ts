import { createRootSelector } from '@/helpers/reduxHelpers';
import type { ReduxStore } from '@/helpers/reduxHelpers';
import type { State } from './state';
import { rootName } from './state';
export const rootSelector = createRootSelector<State>(rootName);
export function tokenSelector(state: ReduxStore) {
  return rootSelector(state)?.token;
}
export function userSelector(state: ReduxStore) {
  return rootSelector(state)?.user;
}
export function loginRequestStatusSelector(state: ReduxStore) {
  return rootSelector(state)?.loginRequestStatus;
}
export function logoutRequestStatusSelector(state: ReduxStore) {
  return rootSelector(state)?.logoutRequestStatus;
}
export function verifyTokenRequestStatusSelector(state: ReduxStore) {
  return rootSelector(state)?.verifyTokenRequestStatus;
}
export function refreshTokenRequestStatusSelector(state: ReduxStore) {
  return rootSelector(state)?.refreshTokenRequestStatus;
}
export function userPermissionsSelector(state: ReduxStore) {
  return rootSelector(state)?.policies || [];
}
export function userRolesSelector(state: ReduxStore) {
  return rootSelector(state)?.roles || [];
}
