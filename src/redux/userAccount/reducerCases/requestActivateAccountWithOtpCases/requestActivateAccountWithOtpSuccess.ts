import { HttpRequestStatus } from '@/constants/apiRequestStatus';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import { put, takeLatest } from 'redux-saga/effects';
import type { State } from '../../state';
import { rootName } from '../../state';
import clearStatusOfRequestActivateAccountWithOtp from './clearStatusOfRequestActivateAccountWithOtp';
const TYPE = `${rootName}/requestActivateAccountWithOtp_success`;
const requestActivateAccountWithOtpSuccess = createCase<any, State>(
  TYPE,
  (_action, state) => {
    return {
      ...state,
      activateAccountWithOtpRequestStatus: HttpRequestStatus.REQUESTSUCCESS,
    };
  },
  takeLatest(TYPE, function* (_action: ReduxAction<any>) {
    yield put(clearStatusOfRequestActivateAccountWithOtp.action({}));
  })
);
export default requestActivateAccountWithOtpSuccess;
