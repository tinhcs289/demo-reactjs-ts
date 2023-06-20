import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import { put, takeLatest } from 'redux-saga/effects';
import type { State } from '../../state';
import { rootName } from '../../state';
import clearStatusOfRequestRegisterUserAccount from './clearStatusOfRequestRegisterUserAccount';
const TYPE = `${rootName}/requestRegisterUserAccount_success`;
const requestRegisterUserAccountSuccess = createCase<any, State>(
  TYPE,
  (action, state) => {
    return {
      ...state,
      registerUserAccountRequestStatus: EApiRequestStatus.REQUESTSUCCESS,
    };
  },
  takeLatest(TYPE, function* (action: ReduxAction<any>) {
    yield put(clearStatusOfRequestRegisterUserAccount.action({}));
  }),
);
export default requestRegisterUserAccountSuccess;