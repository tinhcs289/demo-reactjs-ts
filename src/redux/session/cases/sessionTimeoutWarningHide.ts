import { createCase } from '@/helpers/reduxHelpers';
import type { State } from '../state';
import { rootName } from '../state';
const TYPE = `${rootName}/sessionTimeoutWarningHide`;
const sessionTimeoutWarningHide = createCase<any, State>(TYPE, (_action, state) => {
  return {
    ...state,
    isSessionTimeout: false,
  };
});
export default sessionTimeoutWarningHide;