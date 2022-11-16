import snackbarNotify from './snackbarNotify';
import * as t from '../types';

const reducers = {
  [t.SNACKBAR_PUSHMESSAGE]: snackbarNotify,
};
export default reducers;
