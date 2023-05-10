import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import { put, takeLatest } from 'redux-saga/effects';
import type { State } from '../../state';
import { rootName } from '../../state';
import clearStatusOfRequestActivateAccountWithOtp from './clearStatusOfRequestActivateAccountWithOtp';
const TYPE = `${rootName}/requestActivateAccountWithOtp_success`;
const requestActivateAccountWithOtpSuccess = createCase<any, State>(
  TYPE,
  (action, state) => {
    return {
      ...state,
      activateAccountWithOtpRequestStatus: EApiRequestStatus.REQUESTSUCCESS,
    };
  },
  takeLatest(TYPE, function* (action: ReduxAction<any>) {
    yield put(clearStatusOfRequestActivateAccountWithOtp.action({}));
  }),
);
export default requestActivateAccountWithOtpSuccess;
