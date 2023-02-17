import loginApi from '@/api/authentication/loginApi';
import authentication, { validate } from '@/appCookies/authentication';
import { default as authenticationInLocalStorage } from '@/appLocalStorages/authentication';
import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import { actions as snackbar } from '@/redux/snackbar';
import { actions as userAccount } from '@/redux/userAccount';
import { i18n } from '@/translation';
import type { TAuthentication } from '@/types';
import type { AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import type { State } from '../state';
import { rootName } from '../state';
export type Payload = {
  username: string;
  password: string;
};
type LoginApiReturns = AxiosResponse<TAuthentication>;
const TYPE = `${rootName}/requestLogin`;
const requestLogin = createCase<Payload, State>(
  TYPE,
  (action, state) => {
    return {
      ...(state as any),
      loginRequestStatus: EApiRequestStatus.REQUESTING,
    };
  },
  takeLatest(TYPE, function* (action: ReduxAction<Payload>) {
    const response: LoginApiReturns = (yield loginApi(action.payload)) as LoginApiReturns;
    if (!!response?.data?.hasNotBeenActivated) {
      yield put(userAccount.markAsNotBeenActivated({ userAccount: action.payload.username }));
      yield put(clearStatusOfRequestLogin.action({}));
      return;
    }
    if (!response?.data?.jwt || !validate(response.data.jwt)) {
      yield put(requestLoginFail.action({}));
      return;
    }
    yield put(requestLoginSuccess.action(response.data));
  }),
);
export default requestLogin;
const TYPE_FAIL = `${TYPE}_fail`;
export const requestLoginFail = createCase<any, State>(
  TYPE_FAIL,
  (action, state) => {
    return {
      ...(state as any),
      loginRequestStatus: EApiRequestStatus.REQUESTFAIL,
    };
  },
  takeLatest(TYPE_FAIL, function* (action: ReduxAction<any>) {
    yield put(snackbar.pushMessageError({ content: i18n.t('common:somethingWentWrong_pleaseTryAgainLater') }));
    yield put(clearStatusOfRequestLogin.action({}));
  }),
);
const TYPE_SUCCESS = `${TYPE}_success`;
export const requestLoginSuccess = createCase<TAuthentication, State>(
  TYPE_SUCCESS,
  (action, state) => {
    const { jwt, user } = action.payload;

    authentication.set(jwt);
    authenticationInLocalStorage.set(jwt, true);

    return {
      ...(state as any),
      user: user,
      token: jwt,
      loginRequestStatus: EApiRequestStatus.REQUESTSUCCESS,
    };
  },
  takeLatest(TYPE_FAIL, function* (action: ReduxAction<any>) {
    yield put(clearStatusOfRequestLogin.action({}));
  }),
);
const TYPE_CLEAR = `${TYPE}_clearStatus`;
export const clearStatusOfRequestLogin = createCase<any, State>(
  TYPE_CLEAR,
  (action, state) => {
    return {
      ...(state as any),
      loginRequestStatus: EApiRequestStatus.NONE,
    };
  },
);
