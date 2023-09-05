import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import { createCase } from '@/helpers/reduxHelpers';
import type { State } from '../../state';
import { rootName } from '../../state';
const TYPE = `${rootName}/requestActivateAccountWithOtp_clearStatus`;
const clearStatusOfRequestActivateAccountWithOtp = createCase<any, State>(TYPE, (_action, state) => {
  return {
    ...state,
    activateAccountWithOtpRequestStatus: EApiRequestStatus.NONE,
  };
});
export default clearStatusOfRequestActivateAccountWithOtp;
