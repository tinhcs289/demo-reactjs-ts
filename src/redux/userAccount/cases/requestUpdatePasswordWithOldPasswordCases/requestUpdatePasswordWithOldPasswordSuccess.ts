import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import { put, takeLatest } from 'redux-saga/effects';
import type { State } from '../../state';
import { rootName } from '../../state';
import clearStatusOfRequestUpdatePasswordWithOldPassword from './clearStatusOfRequestUpdatePasswordWithOldPassword';
const TYPE = `${rootName}/requestUpdatePasswordWithOldPassword_success`;
const requestUpdatePasswordWithOldPasswordSuccess = createCase<any, State>(
  TYPE,
  (_action, state) => {
    return {
      ...state,
      updatePasswordWithOldPasswordRequestStatus: EApiRequestStatus.REQUESTSUCCESS,
    };
  },
  takeLatest(TYPE, function* (_action: ReduxAction<any>) {
    yield put(clearStatusOfRequestUpdatePasswordWithOldPassword.action({}));
  })
);
export default requestUpdatePasswordWithOldPasswordSuccess;
