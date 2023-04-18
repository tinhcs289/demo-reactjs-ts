import logoutApi from '@/api/authentication/logoutApi';
import { ApiResponseWithMessageOnly } from '@/api/_types';
import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import type { AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import type { State } from '../state';
import { rootName } from '../state';
import requestLogoutFail from './requestLogoutFail';
import requestLogoutSuccess from './requestLogoutSuccess';
type logoutApiReturns = AxiosResponse<ApiResponseWithMessageOnly>;
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
