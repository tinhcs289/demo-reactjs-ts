import { HttpRequestStatus } from '@/constants/apiRequestStatus';
import { createCase } from '@/helpers/reduxHelpers';
import type { State } from '../../state';
import { rootName } from '../../state';
const TYPE = `${rootName}/requestCreateOtpForResetPassword_clearStatus`;
const clearStatusOfRequestCreateOtpForResetPassword = createCase<any, State>(TYPE, (_action, state) => {
  return {
    ...state,
    createOtpForResetPasswordRequestStatus: HttpRequestStatus.NONE,
  };
});
export default clearStatusOfRequestCreateOtpForResetPassword;
