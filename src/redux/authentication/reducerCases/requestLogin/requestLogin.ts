import loginApi, { LoginApiReturns } from '@/api/authentication/loginApi';
import { validate } from '@/browser/cookies/authentication';
import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import { actions as userAccount } from '@/redux/userAccount';
import type { AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import type { State } from '../../state';
import { rootName } from '../../state';
import clearStatusOfRequestLogin from './requestLogin.clear';
import requestLoginFail from './requestLogin.fail';
import requestLoginSuccess from './requestLogin.success';
export type Payload = { username: string; password: string };
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
    const response = (yield loginApi(action.payload)) as AxiosResponse<LoginApiReturns>;
    if (!!response?.data?.hasNotBeenActivated) {
      yield put(userAccount.markAsNotBeenActivated({ userAccount: action.payload.username }));
      yield put(clearStatusOfRequestLogin.action({}));
      return;
    }
    if (!response?.data?.jwt || !validate(response.data.jwt)) {
      yield put(requestLoginFail.action({ response }));
      return;
    }
    yield put(requestLoginSuccess.action(response.data));
  })
);
export default requestLogin;
