import updatePasswordWithOtpApi from '@/api/resetPassword/updatePasswordWithOtpApi';
import { TApiResponseWithMessageOnly } from '@/api/_types';
import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import type { AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import type { State } from '../state';
import { rootName } from '../state';
import requestUpdatePasswordWithOtpFail from './requestUpdatePasswordWithOtpFail';
import requestUpdatePasswordWithOtpSuccess from './requestUpdatePasswordWithOtpSuccess';
type UpdatePasswordApiPayload = Parameters<typeof updatePasswordWithOtpApi>[0];
type UpdatePasswordApiReturns = AxiosResponse<TApiResponseWithMessageOnly>;
const TYPE = `${rootName}/requestUpdatePasswordWithOtp`;
const requestUpdatePasswordWithOtp = createCase<UpdatePasswordApiPayload, State>(
  TYPE,
  (action, state) => {
    return {
      ...state,
      createOtpForResetPasswordRequestStatus: EApiRequestStatus.REQUESTING,
    };
  },
  takeLatest(TYPE, function* (action: ReduxAction<UpdatePasswordApiPayload>) {
    const { payload } = action;
    const response: UpdatePasswordApiReturns = (yield updatePasswordWithOtpApi(payload)) as UpdatePasswordApiReturns;
    if (response?.status !== 200) {
      yield put(requestUpdatePasswordWithOtpFail.action({}));
      return;
    }
    yield put(requestUpdatePasswordWithOtpSuccess.action({}));
  }),
);
export default requestUpdatePasswordWithOtp;
