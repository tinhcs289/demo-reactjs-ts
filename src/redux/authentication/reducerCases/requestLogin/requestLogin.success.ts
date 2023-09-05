import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import userDataStorage from '@/browser/userDataStorage';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import type { Authentication } from '@/types';
import omit from 'lodash/omit';
import { delay, put, takeLatest } from 'redux-saga/effects';
import type { State } from '../../state';
import { rootName } from '../../state';
import clearStatusOfRequestLogin from './requestLogin.clear';
const TYPE = `${rootName}/requestLogin_success`;
const requestLoginSuccess = createCase<Authentication, State>(
  TYPE,
  (action, state) => {
    const { jwt, user } = action.payload;
    userDataStorage.set(action.payload);
    return {
      ...(state as any),
      user: omit(user, ['roles', 'policies']),
      policies: user?.policies || [],
      roles: user?.roles || [],
      token: jwt,
      loginRequestStatus: EApiRequestStatus.REQUESTSUCCESS,
    };
  },
  takeLatest(TYPE, function* (_action: ReduxAction<any>) {
    yield delay(0);
    yield put(clearStatusOfRequestLogin.action({}));
  })
);
export default requestLoginSuccess;
