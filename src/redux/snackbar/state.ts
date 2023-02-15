import { SNACKBAR_VARIANT } from '@/constants/snackbar';
import Immutable from 'seamless-immutable';
export type State = {
  id: string | null;
  message: string | null;
  variant: `${SNACKBAR_VARIANT}`;
};
export const rootName = 'snackbar';
const state = Immutable<State>({
  id: null,
  message: null,
  variant: SNACKBAR_VARIANT.DEFAULT,
});
export default state;
