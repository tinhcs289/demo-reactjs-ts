import { SNACKBAR_VARIANT } from './contants';
//#region Type of State
export type TReduxStateSnackbar = {
  id: string | null;
  message: string | null;
  variant: `${SNACKBAR_VARIANT}`;
};
//#endregion
