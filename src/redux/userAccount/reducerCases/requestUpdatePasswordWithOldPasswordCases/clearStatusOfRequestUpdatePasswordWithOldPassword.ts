import { HttpRequestStatus } from '@/constants/apiRequestStatus';
import { createCase } from '@/helpers/reduxHelpers';
import type { State } from '../../state';
import { rootName } from '../../state';
const TYPE = `${rootName}/requestUpdatePasswordWithOldPassword_clearStatus`;
const clearStatusOfRequestUpdatePasswordWithOldPassword = createCase<any, State>(TYPE, (_action, state) => {
  return {
    ...state,
    updatePasswordWithOldPasswordRequestStatus: HttpRequestStatus.NONE,
  };
});
export default clearStatusOfRequestUpdatePasswordWithOldPassword;
