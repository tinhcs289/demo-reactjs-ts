import type { UpdatePasswordWithOldPasswordApiParams, UpdatePasswordWithOldPasswordApiReturns } from '@/api/resetPassword/updatePasswordWithOldPasswordApi';
import updatePasswordWithOldPasswordApi from '@/api/resetPassword/updatePasswordWithOldPasswordApi';
import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import type { AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import type { State } from '../../state';
import { rootName } from '../../state';
import requestUpdatePasswordWithOldPasswordFail from './requestUpdatePasswordWithOldPasswordFail';
import requestUpdatePasswordWithOldPasswordSuccess from './requestUpdatePasswordWithOldPasswordSuccess';
const TYPE = `${rootName}/requestUpdatePasswordWithOldPassword`;
const requestUpdatePasswordWithOldPassword = createCase<UpdatePasswordWithOldPasswordApiParams, State>(
  TYPE,
  (action, state) => {
    return {
      ...state,
      updatePasswordWithOldPasswordRequestStatus: EApiRequestStatus.REQUESTING,
    };
  },
  takeLatest(TYPE, function* (action: ReduxAction<UpdatePasswordWithOldPasswordApiParams>) {
    const { payload } = action;
    const response = (yield updatePasswordWithOldPasswordApi(payload)) as AxiosResponse<UpdatePasswordWithOldPasswordApiReturns>;
    if (response?.status !== 200) {
      yield put(requestUpdatePasswordWithOldPasswordFail.action({}));
      return;
    }
    yield put(requestUpdatePasswordWithOldPasswordSuccess.action({}));
  }),
);
export default requestUpdatePasswordWithOldPassword;
