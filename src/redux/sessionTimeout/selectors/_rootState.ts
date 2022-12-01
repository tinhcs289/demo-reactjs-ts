import { TObject } from '@/helpers/reduxSagaHelpers/_types';
import { rootName } from '../state';
import { TReduxStateSessionTimeout } from '../_types';

const rootState = (state: TObject) => {
  return { ...state[rootName] } as TReduxStateSessionTimeout;
};
export default rootState;
