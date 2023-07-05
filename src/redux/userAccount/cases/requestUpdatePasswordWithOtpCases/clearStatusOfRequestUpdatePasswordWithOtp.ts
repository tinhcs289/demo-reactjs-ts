import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import { createCase } from '@/helpers/reduxHelpers';
import type { State } from '../../state';
import { rootName } from '../../state';
const TYPE = `${rootName}/requestUpdatePasswordWithOtp_clearStatus`;
const clearStatusOfRequestUpdatePasswordWithOtp = createCase<any, State>(
  TYPE,
  (_action, state) => {
    return {
      ...state,
      updatePasswordWithOptRequestStatus: EApiRequestStatus.NONE,
    };
  },
);
export default clearStatusOfRequestUpdatePasswordWithOtp;
