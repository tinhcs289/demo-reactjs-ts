import type { UpdatePasswordWithOtpApiParams, UpdatePasswordWithOtpApiReturns } from '@/api/resetPassword/updatePasswordWithOtpApi';
import updatePasswordWithOtpApi from '@/api/resetPassword/updatePasswordWithOtpApi';
import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import type { AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import type { State } from '../../state';
import { rootName } from '../../state';
import requestUpdatePasswordWithOtpFail from './requestUpdatePasswordWithOtpFail';
import requestUpdatePasswordWithOtpSuccess from './requestUpdatePasswordWithOtpSuccess';
const TYPE = `${rootName}/requestUpdatePasswordWithOtp`;
const requestUpdatePasswordWithOtp = createCase<UpdatePasswordWithOtpApiParams, State>(
  TYPE,
  (action, state) => {
    return {
      ...state,
      updatePasswordWithOptRequestStatus: EApiRequestStatus.REQUESTING,
    };
  },
  takeLatest(TYPE, function* (action: ReduxAction<UpdatePasswordWithOtpApiParams>) {
    const { payload } = action;
    const response = (yield updatePasswordWithOtpApi(payload)) as AxiosResponse<UpdatePasswordWithOtpApiReturns>;
    if (response?.status !== 200) {
      yield put(requestUpdatePasswordWithOtpFail.action({}));
      return;
    }
    yield put(requestUpdatePasswordWithOtpSuccess.action({}));
  }),
);
export default requestUpdatePasswordWithOtp;
