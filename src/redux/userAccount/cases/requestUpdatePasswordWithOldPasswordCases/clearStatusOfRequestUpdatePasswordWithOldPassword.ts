import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import { createCase } from '@/helpers/reduxHelpers';
import type { State } from '../../state';
import { rootName } from '../../state';
const TYPE = `${rootName}/requestUpdatePasswordWithOldPassword_clearStatus`;
const clearStatusOfRequestUpdatePasswordWithOldPassword = createCase<any, State>(
  TYPE,
  (action, state) => {
    return {
      ...state,
      updatePasswordWithOldPasswordRequestStatus: EApiRequestStatus.NONE,
    };
  },
);
export default clearStatusOfRequestUpdatePasswordWithOldPassword;
