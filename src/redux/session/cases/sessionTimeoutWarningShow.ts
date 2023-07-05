import { createCase } from '@/helpers/reduxHelpers';
import type { State } from '../state';
import { rootName } from '../state';
const TYPE = `${rootName}/sessionTimeoutWarningShow`;
const sessionTimeoutWarningShow = createCase<any, State>(TYPE, (_action, state) => {
  return {
    ...state,
    isSessionTimeout: true,
  };
});
export default sessionTimeoutWarningShow;