import useStaticListState from './useStaticListState';
export default useStaticListState;
export { ACTION, ASC, DEFAULT_DATA, DESC, PAGE_INDEX, PAGE_SIZE } from './constants';
export { default as useCommonStaticListState } from './useCommonStaticListState';
export type {
  IUseListStateReturnsAction,
  IUseListStateReturnsCommon,
  IUseListStateReturnsControl,
  IUseStaticListStateParams,
  IUseStaticListStateReturns,
  IUseStaticListStateReturnsState,
  TListState,
  TOnQueryArgs,
  TOnQueryLocalyArgs,
  TOnQueryRetuns,
  TPagingState,
  TQueryExtendParams,
  TSortDirect,
  TSortState,
  TStaticListStore,
} from './_types';
