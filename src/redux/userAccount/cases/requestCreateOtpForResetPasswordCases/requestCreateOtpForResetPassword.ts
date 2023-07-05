import type { RequestOtpForResetPasswordApiParams, RequestOtpForResetPasswordApiReturns } from '@/api/resetPassword/requestOtpForResetPasswordApi';
import requestOtpForResetPasswordApi from '@/api/resetPassword/requestOtpForResetPasswordApi';
import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import type { AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import type { State } from '../../state';
import { rootName } from '../../state';
import requestCreateOtpForResetPasswordFail from './requestCreateOtpForResetPasswordFail';
import requestCreateOtpForResetPasswordSuccess from './requestCreateOtpForResetPasswordSuccess';
const TYPE = `${rootName}/requestCreateOtpForResetPassword`;
const requestCreateOtpForResetPassword = createCase<RequestOtpForResetPasswordApiParams, State>(
  TYPE,
  (_action, state) => {
    return {
      ...state,
      createOtpForResetPasswordRequestStatus: EApiRequestStatus.REQUESTING,
    };
  },
  takeLatest(TYPE, function* (action: ReduxAction<RequestOtpForResetPasswordApiParams>) {
    const { payload } = action;
    const response = (yield requestOtpForResetPasswordApi(payload)) as AxiosResponse<RequestOtpForResetPasswordApiReturns>;
    if (response?.status !== 200) {
      yield put(requestCreateOtpForResetPasswordFail.action({}));
      return;
    }
    yield put(requestCreateOtpForResetPasswordSuccess.action({}));
  }),
);
export default requestCreateOtpForResetPassword;
