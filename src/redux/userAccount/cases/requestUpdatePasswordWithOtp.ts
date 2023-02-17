import updatePasswordWithOtpApi from '@/api/resetPassword/updatePasswordWithOtpApi';
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
type UpdatePasswordApiPayload = Parameters<typeof updatePasswordWithOtpApi>[0];
type UpdatePasswordApiReturns = AxiosResponse<TApiResponseWithMessageOnly>;
const TYPE = `${rootName}/requestUpdatePasswordWithOtp`;
const requestUpdatePasswordWithOtp = createCase<UpdatePasswordApiPayload, State>(
  TYPE,
  (action, state) => {
    return {
      ...(state as any),
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
const TYPE_FAIL = `${TYPE}_fail`;
export const requestUpdatePasswordWithOtpFail = createCase<any, State>(
  TYPE_FAIL,
  (action, state) => {
    return {
      ...(state as any),
      createOtpForResetPasswordRequestStatus: EApiRequestStatus.REQUESTFAIL,
    };
  },
  takeLatest(TYPE_FAIL, function* (action: ReduxAction<any>) {
    yield put(snackbar.pushMessageError({ content: i18n.t('common:somethingWentWrong_pleaseTryAgainLater') }));
    yield put(clearStatusOfRequestUpdatePasswordWithOtp.action({}));
  }),
);
const TYPE_SUCCESS = `${TYPE}_success`;
export const requestUpdatePasswordWithOtpSuccess = createCase<any, State>(
  TYPE_SUCCESS,
  (action, state) => {
    return {
      ...(state as any),
      createOtpForResetPasswordRequestStatus: EApiRequestStatus.REQUESTSUCCESS,
    };
  },
  takeLatest(TYPE_FAIL, function* (action: ReduxAction<any>) {
    yield put(clearStatusOfRequestUpdatePasswordWithOtp.action({}));
  }),
);
const TYPE_CLEAR = `${TYPE}_clearStatus`;
export const clearStatusOfRequestUpdatePasswordWithOtp = createCase<any, State>(
  TYPE_CLEAR,
  (action, state) => {
    return {
      ...(state as any),
      createOtpForResetPasswordRequestStatus: EApiRequestStatus.NONE,
    };
  },
);
