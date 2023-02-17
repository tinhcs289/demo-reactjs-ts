import activateAccountWithOtpApi from '@/api/registerAccount/activateAccountWithOtpApi';
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
type ActivateAccountPayload = Parameters<typeof activateAccountWithOtpApi>[0];
type ActivateAccountApiReturns = AxiosResponse<TApiResponseWithMessageOnly>;
const TYPE = `${rootName}/requestActivateAccountWithOtp`;
const requestActivateAccountWithOtp = createCase<ActivateAccountPayload, State>(
  TYPE,
  (action, state) => {
    return {
      ...(state as any),
      activateAccountWithOtpRequestStatus: EApiRequestStatus.REQUESTING,
    };
  },
  takeLatest(TYPE, function* (action: ReduxAction<ActivateAccountPayload>) {
    const { payload } = action;
    const response: ActivateAccountApiReturns = (yield activateAccountWithOtpApi(payload)) as ActivateAccountApiReturns;
    if (response?.status !== 200) {
      yield put(requestActivateAccountWithOtpFail.action({}));
      return;
    }
    yield put(requestActivateAccountWithOtpSuccess.action({}));
  }),
);
export default requestActivateAccountWithOtp;
const TYPE_FAIL = `${TYPE}_fail`;
export const requestActivateAccountWithOtpFail = createCase<any, State>(
  TYPE_FAIL,
  (action, state) => {
    return {
      ...(state as any),
      activateAccountWithOtpRequestStatus: EApiRequestStatus.REQUESTFAIL,
    };
  },
  takeLatest(TYPE_FAIL, function* (action: ReduxAction<any>) {
    yield put(snackbar.pushMessageError({ content: i18n.t('common:somethingWentWrong_pleaseTryAgainLater') }));
    yield put(clearStatusOfRequestActivateAccountWithOtp.action({}));
  }),
);
const TYPE_SUCCESS = `${TYPE}_success`;
export const requestActivateAccountWithOtpSuccess = createCase<any, State>(
  TYPE_SUCCESS,
  (action, state) => {
    return {
      ...(state as any),
      activateAccountWithOtpRequestStatus: EApiRequestStatus.REQUESTSUCCESS,
    };
  },
  takeLatest(TYPE_FAIL, function* (action: ReduxAction<any>) {
    yield put(clearStatusOfRequestActivateAccountWithOtp.action({}));
  }),
);
const TYPE_CLEAR = `${TYPE}_clearStatus`;
export const clearStatusOfRequestActivateAccountWithOtp = createCase<any, State>(
  TYPE_CLEAR,
  (action, state) => {
    return {
      ...(state as any),
      activateAccountWithOtpRequestStatus: EApiRequestStatus.NONE,
    };
  },
);
