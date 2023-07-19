import Immutable from 'seamless-immutable';
export type State = {
  /**
   * `true` incase `refresh-token` request failed
   */
  isSessionTimeout: boolean;
  /**
   * `true` incase current `access-token` are changes (eg: login in with another account or using external authorized `access-token`)
   */
  isSessionChange: boolean;
  /**
   * `true` incase logged-in in another browser tab
   */
  isSessionChangeToLoggedIn: boolean;
  /**
   * `true` incase logged-out in another browser tab
   */
  isSessionChangeToLoggedOut: boolean;
};
export const rootName = 'session';
const initialState = Immutable<State>({
  isSessionTimeout: false,
  isSessionChange: false,
  isSessionChangeToLoggedIn: false,
  isSessionChangeToLoggedOut: false,
});
export default initialState;
