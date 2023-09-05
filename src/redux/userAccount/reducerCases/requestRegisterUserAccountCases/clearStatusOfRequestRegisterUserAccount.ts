import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import { createCase } from '@/helpers/reduxHelpers';
import type { State } from '../../state';
import { rootName } from '../../state';
const TYPE = `${rootName}/requestRegisterUserAccount_clearStatus`;
const clearStatusOfRequestRegisterUserAccount = createCase<any, State>(TYPE, (_action, state) => {
  return {
    ...state,
    registerUserAccountRequestStatus: EApiRequestStatus.NONE,
  };
});
export default clearStatusOfRequestRegisterUserAccount;
