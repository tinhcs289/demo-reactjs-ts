import type { GetUserProfileApiReturns, GetUserProfileApiParams } from '@/api/userProfile/getUserProfileApi';
import getUserProfileApi from '@/api/userProfile/getUserProfileApi';
import { HttpRequestStatus } from '@/constants/apiRequestStatus';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import type { AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import type { State } from '../../state';
import { rootName } from '../../state';
import requestUserProfileFail from './requestUserProfileFail';
import requestUserProfileSuccess from './requestUserProfileSuccess';
type Payload = GetUserProfileApiParams;
const TYPE = `${rootName}/requestUserProfile`;
const requestUserProfile = createCase<Payload, State>(
  TYPE,
  (_action, state) => {
    return {
      ...state,
      getUserProfileRequestStatus: HttpRequestStatus.REQUESTING,
    } as any;
  },
  takeLatest(TYPE, function* (action: ReduxAction<Payload>) {
    const response: AxiosResponse<GetUserProfileApiReturns> = yield getUserProfileApi(action.payload);
    if (response?.status !== 200) {
      yield put(requestUserProfileFail.action({}));
      return;
    }
    yield put(requestUserProfileSuccess.action({ data: response.data }));
  })
);
export default requestUserProfile;
