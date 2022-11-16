import Immutable from 'seamless-immutable';
import { SNACKBAR_VARIANT } from './contants';
import { TReduxStateSnackbar } from './_types';

export const rootName = 'snackbar';
const initialState = Immutable<TReduxStateSnackbar>({
  id: null,
  message: null,
  variant: SNACKBAR_VARIANT.DEFAULT,
});
export default initialState;
