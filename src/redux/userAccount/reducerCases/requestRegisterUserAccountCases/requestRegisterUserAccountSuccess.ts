import { HttpRequestStatus } from '@/constants/apiRequestStatus';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import { put, takeLatest } from 'redux-saga/effects';
import type { State } from '../../state';
import { rootName } from '../../state';
import clearStatusOfRequestRegisterUserAccount from './clearStatusOfRequestRegisterUserAccount';
const TYPE = `${rootName}/requestRegisterUserAccount_success`;
const requestRegisterUserAccountSuccess = createCase<any, State>(
  TYPE,
  (_action, state) => {
    return {
      ...state,
      registerUserAccountRequestStatus: HttpRequestStatus.REQUESTSUCCESS,
    };
  },
  takeLatest(TYPE, function* (_action: ReduxAction<any>) {
    yield put(clearStatusOfRequestRegisterUserAccount.action({}));
  })
);
export default requestRegisterUserAccountSuccess;
