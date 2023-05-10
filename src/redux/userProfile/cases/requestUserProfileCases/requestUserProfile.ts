import type { GetUserProfileApiReturns } from '@/api/userProfile/getUserProfileApi';
import getUserProfileApi from '@/api/userProfile/getUserProfileApi';
import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import type { AnyObject } from '@/types';
import type { AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import type { State } from '../../state';
import { rootName } from '../../state';
import requestUserProfileFail from './requestUserProfileFail';
import requestUserProfileSuccess from './requestUserProfileSuccess';
const TYPE = `${rootName}/requestUserProfile`;
const requestUserProfile = createCase<AnyObject, State>(
  TYPE,
  (action, state) => {
    return {
      ...state,
      getUserProfileRequestStatus: EApiRequestStatus.REQUESTING,
    } as any;
  },
  takeLatest(TYPE, function* (action: ReduxAction<AnyObject>) {
    const response: AxiosResponse<GetUserProfileApiReturns> = (yield getUserProfileApi());
    if (response?.status !== 200) {
      yield put(requestUserProfileFail.action({}));
      return;
    }
    yield put(requestUserProfileSuccess.action({ data: response.data }));
  }),
);
export default requestUserProfile;
