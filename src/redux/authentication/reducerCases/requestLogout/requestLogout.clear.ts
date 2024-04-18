import { HttpRequestStatus } from '@/constants/apiRequestStatus';
import { createCase } from '@/helpers/reduxHelpers';
import type { State } from '../../state';
import { rootName } from '../../state';
const TYPE = `${rootName}/requestLogout_clearStatus`;
const clearStatusOfRequestLogout = createCase<any, State>(TYPE, (_action, state) => {
  return {
    ...(state as any),
    logoutRequestStatus: HttpRequestStatus.NONE,
  };
});
export default clearStatusOfRequestLogout;
