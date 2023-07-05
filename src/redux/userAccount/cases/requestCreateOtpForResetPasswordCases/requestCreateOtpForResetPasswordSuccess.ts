import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import { put, takeLatest } from 'redux-saga/effects';
import type { State } from '../../state';
import { rootName } from '../../state';
import clearStatusOfRequestCreateOtpForResetPassword from './clearStatusOfRequestCreateOtpForResetPassword';
const TYPE = `${rootName}/requestCreateOtpForResetPassword_success`;
const requestCreateOtpForResetPasswordSuccess = createCase<any, State>(
  TYPE,
  (_action, state) => {
    return {
      ...state,
      createOtpForResetPasswordRequestStatus: EApiRequestStatus.REQUESTSUCCESS,
    };
  },
  takeLatest(TYPE, function* (_action: ReduxAction<any>) {
    yield put(clearStatusOfRequestCreateOtpForResetPassword.action({}));
  }),
);
export default requestCreateOtpForResetPasswordSuccess;
