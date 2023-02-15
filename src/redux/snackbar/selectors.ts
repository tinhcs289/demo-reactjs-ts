import type { ReduxStore } from '@/helpers/reduxHelpers';
import { createRootSelector } from '@/helpers/reduxHelpers';
import type { State } from './state';
import { rootName } from './state';
export const rootSelector = createRootSelector<State>(rootName);
export function idSelector(state: ReduxStore) {
  return rootSelector(state)?.id;
};
export function messageSelector(state: ReduxStore) {
  return rootSelector(state)?.message;
};
export function variantSelector(state: ReduxStore) {
  return rootSelector(state)?.variant;
};