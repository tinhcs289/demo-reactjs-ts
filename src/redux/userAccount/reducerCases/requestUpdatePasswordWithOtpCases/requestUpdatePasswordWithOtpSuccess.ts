import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import { put, takeLatest } from 'redux-saga/effects';
import type { State } from '../../state';
import { rootName } from '../../state';
import clearStatusOfRequestUpdatePasswordWithOtp from './clearStatusOfRequestUpdatePasswordWithOtp';
const TYPE = `${rootName}/requestUpdatePasswordWithOtp_success`;
const requestUpdatePasswordWithOtpSuccess = createCase<any, State>(
  TYPE,
  (_action, state) => {
    return {
      ...state,
      updatePasswordWithOptRequestStatus: EApiRequestStatus.REQUESTSUCCESS,
    };
  },
  takeLatest(TYPE, function* (_action: ReduxAction<any>) {
    yield put(clearStatusOfRequestUpdatePasswordWithOtp.action({}));
  })
);
export default requestUpdatePasswordWithOtpSuccess;
