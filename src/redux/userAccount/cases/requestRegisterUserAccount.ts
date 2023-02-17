import registerApi from '@/api/registerAccount/registerApi';
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
type RegisterAccountApiPayload = Parameters<typeof registerApi>[0];
type RegisterAccountApiReturns = AxiosResponse<TApiResponseWithMessageOnly>;
const TYPE = `${rootName}/requestRegisterUserAccount`;
const requestRegisterUserAccount = createCase<RegisterAccountApiPayload, State>(
  TYPE,
  (action, state) => {
    return {
      ...(state as any),
      createOtpForResetPasswordRequestStatus: EApiRequestStatus.REQUESTING,
    };
  },
  takeLatest(TYPE, function* (action: ReduxAction<RegisterAccountApiPayload>) {
    const { payload } = action;
    const response: RegisterAccountApiReturns = (yield registerApi(payload)) as RegisterAccountApiReturns;
    if (response?.status !== 200) {
      yield put(requestRegisterUserAccountFail.action({}));
      return;
    }
    yield put(requestRegisterUserAccountSuccess.action({}));
  }),
);
export default requestRegisterUserAccount;
const TYPE_FAIL = `${TYPE}_fail`;
export const requestRegisterUserAccountFail = createCase<any, State>(
  TYPE_FAIL,
  (action, state) => {
    return {
      ...(state as any),
      createOtpForResetPasswordRequestStatus: EApiRequestStatus.REQUESTFAIL,
    };
  },
  takeLatest(TYPE_FAIL, function* (action: ReduxAction<any>) {
    yield put(snackbar.pushMessageError({ content: i18n.t('common:somethingWentWrong_pleaseTryAgainLater') }));
    yield put(clearStatusOfRequestRegisterUserAccount.action({}));
  }),
);
const TYPE_SUCCESS = `${TYPE}_success`;
export const requestRegisterUserAccountSuccess = createCase<any, State>(
  TYPE_SUCCESS,
  (action, state) => {
    return {
      ...(state as any),
      createOtpForResetPasswordRequestStatus: EApiRequestStatus.REQUESTSUCCESS,
    };
  },
  takeLatest(TYPE_FAIL, function* (action: ReduxAction<any>) {
    yield put(clearStatusOfRequestRegisterUserAccount.action({}));
  }),
);
const TYPE_CLEAR = `${TYPE}_clearStatus`;
export const clearStatusOfRequestRegisterUserAccount = createCase<any, State>(
  TYPE_CLEAR,
  (action, state) => {
    return {
      ...(state as any),
      createOtpForResetPasswordRequestStatus: EApiRequestStatus.NONE,
    };
  },
);
