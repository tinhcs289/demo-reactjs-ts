import authentication from '@/appCookies/authentication';
import userPermissions from '@/appCookies/userPermissions';
import { default as authenticationInLocalStorage } from '@/appLocalStorages/authentication';
import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import { delay, put, takeLatest } from 'redux-saga/effects';
import type { State } from '../../state';
import { rootName } from '../../state';
import clearStatusOfRequestLogout from './clearStatusOfRequestLogout';
const TYPE = `${rootName}/requestLogout_success`;
const requestLogoutSuccess = createCase<any, State>(
  TYPE,
  (_action, state) => {
    authentication.clear();
    authenticationInLocalStorage.set(null, true);
    userPermissions.clear();
    return {
      ...(state as any),
      user: null,
      token: null,
      logoutRequestStatus: EApiRequestStatus.REQUESTSUCCESS,
    };
  },
  takeLatest(TYPE, function* (_action: ReduxAction<any>) {
    yield delay(0);
    yield put(clearStatusOfRequestLogout.action({}));
  })
);
export default requestLogoutSuccess;
