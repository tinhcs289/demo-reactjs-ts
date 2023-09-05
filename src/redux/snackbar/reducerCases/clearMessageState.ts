import { SNACKBAR_VARIANT } from '@/constants/snackbar';
import { createCase } from '@/helpers/reduxHelpers';
import type { State } from '../state';
import { rootName } from '../state';
const TYPE = `${rootName}/clearMessageState`;
const clearMessageState = createCase<any, State>(TYPE, (_action, state) => {
  return {
    ...state,
    id: null,
    message: null,
    variant: SNACKBAR_VARIANT.DEFAULT,
  };
});
export default clearMessageState;
