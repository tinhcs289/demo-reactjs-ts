import requestOtpForResetPasswordApi from '@/api/resetPassword/requestOtpForResetPasswordApi';
import { ApiResponseWithMessageOnly } from '@/api/_types';
import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import type { AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import type { State } from '../state';
import { rootName } from '../state';
import requestCreateOtpForResetPasswordFail from './requestCreateOtpForResetPasswordFail';
import requestCreateOtpForResetPasswordSuccess from './requestCreateOtpForResetPasswordSuccess';
type RequestOtpPayload = Parameters<typeof requestOtpForResetPasswordApi>[0];
type RequestOtpApiReturns = AxiosResponse<ApiResponseWithMessageOnly>;
const TYPE = `${rootName}/requestCreateOtpForResetPassword`;
const requestCreateOtpForResetPassword = createCase<RequestOtpPayload, State>(
  TYPE,
  (action, state) => {
    return {
      ...state,
      createOtpForResetPasswordRequestStatus: EApiRequestStatus.REQUESTING,
    };
  },
  takeLatest(TYPE, function* (action: ReduxAction<RequestOtpPayload>) {
    const { payload } = action;
    const response: RequestOtpApiReturns = (yield requestOtpForResetPasswordApi(payload)) as RequestOtpApiReturns;
    if (response?.status !== 200) {
      yield put(requestCreateOtpForResetPasswordFail.action({}));
      return;
    }
    yield put(requestCreateOtpForResetPasswordSuccess.action({}));
  }),
);
export default requestCreateOtpForResetPassword;
