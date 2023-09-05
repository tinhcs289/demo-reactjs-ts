import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import { createCase } from '@/helpers/reduxHelpers';
import type { AnyObject } from '@/types';
import type { State } from '../../state';
import { rootName } from '../../state';
const TYPE = `${rootName}/requestUpdateUserProfile_fail`;
const requestUpdateUserProfileFail = createCase<AnyObject, State>(TYPE, (action, state) => {
  return {
    ...state,
    updateUserProfileRequestStatus: EApiRequestStatus.REQUESTFAIL,
  } as any;
});
export default requestUpdateUserProfileFail;
