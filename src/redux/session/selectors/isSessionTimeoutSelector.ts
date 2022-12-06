import booleanOrDefault from '@/helpers/formatHelpers/booleanOrDefault';
import { TObject } from '@/helpers/reduxSagaHelpers/_types';
import rootState from './_rootState';

const isSessionTimeoutSelector = (state: TObject) => booleanOrDefault(rootState(state)?.isSessionTimeout);
export default isSessionTimeoutSelector;
