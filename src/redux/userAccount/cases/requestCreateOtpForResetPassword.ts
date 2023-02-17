import requestOtpForResetPasswordApi from '@/api/resetPassword/requestOtpForResetPasswordApi';
import { TApiResponseWithMessageOnly } from '@/api/_types';
import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import { actions as snackbar } from '@/redux/snackbar';
import { i18n } from '@/translation';
import type { AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import type { State } from '../state';
import { rootName } from '../state';
type RequestOtpPayload = Parameters<typeof requestOtpForResetPasswordApi>[0];
type RequestOtpApiReturns = AxiosResponse<TApiResponseWithMessageOnly>;
const TYPE = `${rootName}/requestCreateOtpForResetPassword`;
const requestCreateOtpForResetPassword = createCase<RequestOtpPayload, State>(
  TYPE,
  (action, state) => {
    return {
      ...(state as any),
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
const TYPE_FAIL = `${TYPE}_fail`;
export const requestCreateOtpForResetPasswordFail = createCase<any, State>(
  TYPE_FAIL,
  (action, state) => {
    return {
      ...(state as any),
      createOtpForResetPasswordRequestStatus: EApiRequestStatus.REQUESTFAIL,
    };
  },
  takeLatest(TYPE_FAIL, function* (action: ReduxAction<any>) {
    yield put(snackbar.pushMessageError({ content: i18n.t('common:somethingWentWrong_pleaseTryAgainLater') }));
    yield put(clearStatusOfRequestCreateOtpForResetPassword.action({}));
  }),
);
const TYPE_SUCCESS = `${TYPE}_success`;
export const requestCreateOtpForResetPasswordSuccess = createCase<any, State>(
  TYPE_SUCCESS,
  (action, state) => {
    return {
      ...(state as any),
      createOtpForResetPasswordRequestStatus: EApiRequestStatus.REQUESTSUCCESS,
    };
  },
  takeLatest(TYPE_FAIL, function* (action: ReduxAction<any>) {
    yield put(clearStatusOfRequestCreateOtpForResetPassword.action({}));
  }),
);
const TYPE_CLEAR = `${TYPE}_clearStatus`;
export const clearStatusOfRequestCreateOtpForResetPassword = createCase<any, State>(
  TYPE_CLEAR,
  (action, state) => {
    return {
      ...(state as any),
      createOtpForResetPasswordRequestStatus: EApiRequestStatus.NONE,
    };
  },
);
