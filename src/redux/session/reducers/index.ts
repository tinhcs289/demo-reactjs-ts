import hideSessionTimeoutWarning from './hideSessionTimeoutWarning';
import showSessionTimeoutWarning from './showSessionTimeoutWarning';
import * as t from '../types';

const reducers = {
  [t.SESSION_TIMEOUT_WARNING_SHOW]: showSessionTimeoutWarning,
  [t.SESSION_TIMEOUT_WARNING_HIDE]: hideSessionTimeoutWarning,
};
export default reducers;
