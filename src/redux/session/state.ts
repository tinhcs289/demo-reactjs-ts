import Immutable from 'seamless-immutable';
import { TReduxStateSessionTimeout } from './_types';

export const rootName = 'session';
const initialState = Immutable<TReduxStateSessionTimeout>({
  isSessionTimeout: false,
  isSessionChange: false,
  isSessionChangeToLoggedIn: false,
  isSessionChangeToLoggedOut: false,
});
export default initialState;
