import type {
  UpdateUserProfileApiReturns,
  UpdateUserProfileApiParams,
} from '@/api/userProfile/updateUserProfileApi';
import updateUserProfileApi from '@/api/userProfile/updateUserProfileApi';
import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import isOkWithData from '@/helpers/httpRequestHelpers/isOkWithData';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import type { AnyObject } from '@/types';
import type { AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import type { State } from '../../state';
import { rootName } from '../../state';
import requestUpdateUserProfileFail from './requestUpdateUserProfileFail';
import requestUpdateUserProfileSuccess from './requestUpdateUserProfileSuccess';
const TYPE = `${rootName}/requestUpdateUserProfile`;
const requestUpdateUserProfile = createCase<AnyObject, State>(
  TYPE,
  (action, state) => {
    return {
      ...state,
      updateUserProfileRequestStatus: EApiRequestStatus.REQUESTING,
    } as any;
  },
  takeLatest(TYPE, function* (action: ReduxAction<UpdateUserProfileApiParams>) {
    const response: AxiosResponse<UpdateUserProfileApiReturns> = yield updateUserProfileApi(action.payload);
    if (!isOkWithData(response)) {
      yield put(requestUpdateUserProfileFail.action({}));
      return;
    }
    yield put(requestUpdateUserProfileSuccess.action({}));
  })
);
export default requestUpdateUserProfile;
