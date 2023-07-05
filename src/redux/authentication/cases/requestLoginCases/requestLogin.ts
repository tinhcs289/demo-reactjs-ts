import loginApi from '@/api/authentication/loginApi';
import { validate } from '@/appCookies/authentication';
import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import { actions as userAccount } from '@/redux/userAccount';
import type { Authentication } from '@/types';
import type { AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import type { State } from '../../state';
import { rootName } from '../../state';
import clearStatusOfRequestLogin from './clearStatusOfRequestLogin';
import requestLoginFail from './requestLoginFail';
import requestLoginSuccess from './requestLoginSuccess';
export type Payload = { username: string; password: string };
type LoginApiReturns = AxiosResponse<Authentication>;
const TYPE = `${rootName}/requestLogin`;
const requestLogin = createCase<Payload, State>(
  TYPE,
  (_action, state) => {
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
