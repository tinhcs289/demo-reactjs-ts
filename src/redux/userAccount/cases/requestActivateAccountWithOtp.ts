import activateAccountWithOtpApi from '@/api/registerAccount/activateAccountWithOtpApi';
import { ApiResponseWithMessageOnly } from '@/api/_types';
import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import type { AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import type { State } from '../state';
import { rootName } from '../state';
import requestActivateAccountWithOtpFail from './requestActivateAccountWithOtpFail';
import requestActivateAccountWithOtpSuccess from './requestActivateAccountWithOtpSuccess';
type ActivateAccountPayload = Parameters<typeof activateAccountWithOtpApi>[0];
type ActivateAccountApiReturns = AxiosResponse<ApiResponseWithMessageOnly>;
const TYPE = `${rootName}/requestActivateAccountWithOtp`;
const requestActivateAccountWithOtp = createCase<ActivateAccountPayload, State>(
  TYPE,
  (action, state) => {
    return {
      ...state,
      activateAccountWithOtpRequestStatus: EApiRequestStatus.REQUESTING,
    };
  },
  takeLatest(TYPE, function* (action: ReduxAction<ActivateAccountPayload>) {
    const { payload } = action;
    const response: ActivateAccountApiReturns = (yield activateAccountWithOtpApi(payload)) as ActivateAccountApiReturns;
    if (response?.status !== 200) {
      yield put(requestActivateAccountWithOtpFail.action({}));
      return;
    }
    yield put(requestActivateAccountWithOtpSuccess.action({}));
  }),
);
export default requestActivateAccountWithOtp;
