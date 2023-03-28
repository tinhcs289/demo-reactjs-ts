import registerApi from '@/api/registerAccount/registerApi';
import { TApiResponseWithMessageOnly } from '@/api/_types';
import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import type { AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import type { State } from '../state';
import { rootName } from '../state';
import requestRegisterUserAccountFail from './requestRegisterUserAccountFail';
import requestRegisterUserAccountSuccess from './requestRegisterUserAccountSuccess';
type RegisterAccountApiPayload = Parameters<typeof registerApi>[0];
type RegisterAccountApiReturns = AxiosResponse<TApiResponseWithMessageOnly>;
const TYPE = `${rootName}/requestRegisterUserAccount`;
const requestRegisterUserAccount = createCase<RegisterAccountApiPayload, State>(
  TYPE,
  (action, state) => {
    return {
      ...state,
      createOtpForResetPasswordRequestStatus: EApiRequestStatus.REQUESTING,
    };
  },
  takeLatest(TYPE, function* (action: ReduxAction<RegisterAccountApiPayload>) {
    const { payload } = action;
    const response: RegisterAccountApiReturns = (yield registerApi(payload)) as RegisterAccountApiReturns;
    if (response?.status !== 200) {
      yield put(requestRegisterUserAccountFail.action({}));
      return;
    }
    yield put(requestRegisterUserAccountSuccess.action({}));
  }),
);
export default requestRegisterUserAccount;
