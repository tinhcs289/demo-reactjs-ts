import type { RegisterApiParams, RegisterApiReturns } from '@/api/registerAccount/registerApi';
import registerApi from '@/api/registerAccount/registerApi';
import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import type { AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import type { State } from '../../state';
import { rootName } from '../../state';
import requestRegisterUserAccountFail from './requestRegisterUserAccountFail';
import requestRegisterUserAccountSuccess from './requestRegisterUserAccountSuccess';
const TYPE = `${rootName}/requestRegisterUserAccount`;
const requestRegisterUserAccount = createCase<RegisterApiParams, State>(
  TYPE,
  (_action, state) => {
    return {
      ...state,
      registerUserAccountRequestStatus: EApiRequestStatus.REQUESTING,
    };
  },
  takeLatest(TYPE, function* (action: ReduxAction<RegisterApiParams>) {
    const { payload } = action;
    const response = (yield registerApi(payload)) as AxiosResponse<RegisterApiReturns>;
    if (response?.status !== 200) {
      yield put(requestRegisterUserAccountFail.action({}));
      return;
    }
    yield put(requestRegisterUserAccountSuccess.action({}));
  })
);
export default requestRegisterUserAccount;
