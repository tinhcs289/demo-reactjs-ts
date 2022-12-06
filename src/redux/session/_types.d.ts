//#region Type of State
export type TReduxStateSessionTimeout = {
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
//#endregion

//#region Type of Action Payload
export type TActionShowSessionTimeoutWarningPayload = {
  [x: string]: any;
};

export type TActionHideSessionTimeoutWarningPayload = {
  [x: string]: any;
};
//#endregion
