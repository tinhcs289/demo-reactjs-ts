//#region Type of State
export type TReduxStateSessionTimeout = {
  isSessionTimeout: boolean;
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
