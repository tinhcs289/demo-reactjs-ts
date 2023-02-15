import logoutApi from '@/api/authentication/logoutApi';
import { TApiResponseWithMessageOnly } from '@/api/_types';
import authentication from '@/appCookies/authentication';
import { default as authenticationInLocalStorage } from '@/appLocalStorages/authentication';
import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import { actions as snackbar } from '@/redux/snackbar';
import { i18n } from '@/translation';
import type { AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import type { State } from '../state';
import { rootName } from '../state';
type logoutApiReturns = AxiosResponse<TApiResponseWithMessageOnly>;
const TYPE = `${rootName}/requestLogout`;
const requestLogout = createCase<any, State>(
  TYPE,
  (action, state) => {
    return {
      ...(state as any),
      logoutRequestStatus: EApiRequestStatus.REQUESTING,
    };
  },
  takeLatest(TYPE, function* (action: ReduxAction<any>) {
    const response: logoutApiReturns = (yield logoutApi()) as logoutApiReturns;
    if (response?.status !== 200) {
      yield put(requestLogoutFail.action({}));
      return;
    }
    yield put(requestLogoutSuccess.action({}));
  }),
);
export default requestLogout;
const TYPE_FAIL = `${TYPE}_fail`;
export const requestLogoutFail = createCase<any, State>(
  TYPE_FAIL,
  (action, state) => {
    return {
      ...(state as any),
      logoutRequestStatus: EApiRequestStatus.REQUESTFAIL,
    };
  },
  takeLatest(TYPE_FAIL, function* (action: ReduxAction<any>) {
    yield put(snackbar.pushMessageError({ content: i18n.t('common:somethingWentWrong_pleaseTryAgainLater') }));
    yield put(clearStatusOfRequestLogout.action({}));
  }),
);
const TYPE_SUCCESS = `${TYPE}_success`;
export const requestLogoutSuccess = createCase<any, State>(
  TYPE_SUCCESS,
  (action, state) => {
    authentication.clear();
    authenticationInLocalStorage.set(null, true);
    return {
      ...(state as any),
      user: null,
      token: null,
      logoutRequestStatus: EApiRequestStatus.REQUESTSUCCESS,
    };
  },
  takeLatest(TYPE_FAIL, function* (action: ReduxAction<any>) {
    yield put(clearStatusOfRequestLogout.action({}));
  }),
);
const TYPE_CLEAR = `${TYPE}_clearStatus`;
export const clearStatusOfRequestLogout = createCase<any, State>(
  TYPE_CLEAR,
  (action, state) => {
    return {
      ...(state as any),
      logoutRequestStatus: EApiRequestStatus.NONE,
    };
  },
);
