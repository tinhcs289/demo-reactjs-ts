import type { GetUserProfileApiReturns } from '@/api/userProfile/getUserProfileApi';
import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import { createCase } from '@/helpers/reduxHelpers';
import type { State } from '../../state';
import { rootName } from '../../state';
const TYPE = `${rootName}/requestUserProfile_success`;
const requestUserProfileSuccess = createCase<{ data: GetUserProfileApiReturns }, State>(
  TYPE,
  (action, state) => {
    return {
      ...state,
      data: action.payload.data,
      getUserProfileRequestStatus: EApiRequestStatus.REQUESTSUCCESS,
    };
  }
);
export default requestUserProfileSuccess;
