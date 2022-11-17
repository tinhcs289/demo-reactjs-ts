import { TObject } from '@/helpers/reduxSagaHelpers/_types';
import rootState from './_rootState';

const newMessageVariantSelector = (state: TObject) => rootState(state)?.variant;
export default newMessageVariantSelector;
