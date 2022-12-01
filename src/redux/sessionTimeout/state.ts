import Immutable from 'seamless-immutable';
import { TReduxStateSessionTimeout } from './_types';

export const rootName = 'sessionTimeout';
const initialState = Immutable<TReduxStateSessionTimeout>({
  isSessionTimeout: false,
});
export default initialState;
