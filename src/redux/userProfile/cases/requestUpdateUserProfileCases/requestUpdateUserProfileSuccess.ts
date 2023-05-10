import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import { createCase } from '@/helpers/reduxHelpers';
import type { State } from '../../state';
import { rootName } from '../../state';
import { AnyObject } from '@/types';
const TYPE = `${rootName}/requestUpdateUserProfile_success`;
const requestUpdateUserProfileSuccess = createCase<AnyObject, State>(
  TYPE,
  (action, state) => {
    return {
      ...state,
      updateUserProfileRequestStatus: EApiRequestStatus.REQUESTSUCCESS,
    } as any;
  }
);
export default requestUpdateUserProfileSuccess;
