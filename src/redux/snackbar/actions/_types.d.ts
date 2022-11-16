import { SNACKBAR_VARIANT } from '../contants';

export type TActionPushMessagePayload = {
  content: string;
  variant: `${SNACKBAR_VARIANT}`;
  [x: string]: any;
};
