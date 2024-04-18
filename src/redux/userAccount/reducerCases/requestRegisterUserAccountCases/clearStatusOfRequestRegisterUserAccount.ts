import { HttpRequestStatus } from '@/constants/apiRequestStatus';
import { createCase } from '@/helpers/reduxHelpers';
import type { State } from '../../state';
import { rootName } from '../../state';
const TYPE = `${rootName}/requestRegisterUserAccount_clearStatus`;
const clearStatusOfRequestRegisterUserAccount = createCase<any, State>(TYPE, (_action, state) => {
  return {
    ...state,
    registerUserAccountRequestStatus: HttpRequestStatus.NONE,
  };
});
export default clearStatusOfRequestRegisterUserAccount;
