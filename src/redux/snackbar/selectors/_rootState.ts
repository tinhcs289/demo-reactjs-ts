import { TObject } from '@/helpers/reduxSagaHelpers/types';
import { rootName } from '../state';
import { TReduxStateSnackbar } from '../_types';

const rootState = (state: TObject) => {
  return { ...state[rootName] } as TReduxStateSnackbar;
};
export default rootState;
