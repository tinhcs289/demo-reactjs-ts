import authentication from '@/appCookies/authentication';
import { default as authenticationInLocalStorage } from '@/appLocalStorages/authentication';
import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import type { TAuthentication } from '@/types';
import { put, takeLatest } from 'redux-saga/effects';
import type { State } from '../state';
import { rootName } from '../state';
import clearStatusOfRequestLogin from './clearStatusOfRequestLogin';
const TYPE = `${rootName}/requestLogin_success`;
const requestLoginSuccess = createCase<TAuthentication, State>(
  TYPE,
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
  takeLatest(TYPE, function* (action: ReduxAction<any>) {
    yield put(clearStatusOfRequestLogin.action({}));
  }),
);
export default requestLoginSuccess;
