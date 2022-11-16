import { TObject } from '@/helpers/reduxSagaHelpers/types';
import rootState from './_rootState';

const newMessageContent = (state: TObject) => rootState(state)?.message;
export default newMessageContent;
