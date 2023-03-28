import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import { createCase } from '@/helpers/reduxHelpers';
import type { State } from '../state';
import { rootName } from '../state';
const TYPE = `${rootName}/requestUpdatePasswordWithOtp_clearStatus`;
const clearStatusOfRequestUpdatePasswordWithOtp = createCase<any, State>(
  TYPE,
  (action, state) => {
    return {
      ...state,
      createOtpForResetPasswordRequestStatus: EApiRequestStatus.NONE,
    };
  },
);
export default clearStatusOfRequestUpdatePasswordWithOtp;
