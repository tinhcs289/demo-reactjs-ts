import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import { createCase } from '@/helpers/reduxHelpers';
import type { AnyObject } from '@/types';
import type { State } from '../../state';
import { rootName } from '../../state';
const TYPE = `${rootName}/requestUserProfile_fail`;
const requestUserProfileFail = createCase<AnyObject, State>(TYPE, (action, state) => {
  return {
    ...state,
    getUserProfileRequestStatus: EApiRequestStatus.REQUESTFAIL,
  } as any;
});
export default requestUserProfileFail;
