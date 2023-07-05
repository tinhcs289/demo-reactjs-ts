import type { ActivateAccountWithOtpApiParams, ActivateAccountWithOtpApiReturns } from '@/api/registerAccount/activateAccountWithOtpApi';
import activateAccountWithOtpApi from '@/api/registerAccount/activateAccountWithOtpApi';
import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import type { AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import type { State } from '../../state';
import { rootName } from '../../state';
import requestActivateAccountWithOtpFail from './requestActivateAccountWithOtpFail';
import requestActivateAccountWithOtpSuccess from './requestActivateAccountWithOtpSuccess';
const TYPE = `${rootName}/requestActivateAccountWithOtp`;
const requestActivateAccountWithOtp = createCase<ActivateAccountWithOtpApiParams, State>(
  TYPE,
  (_action, state) => {
    return {
      ...state,
      activateAccountWithOtpRequestStatus: EApiRequestStatus.REQUESTING,
    };
  },
  takeLatest(TYPE, function* (action: ReduxAction<ActivateAccountWithOtpApiParams>) {
    const { payload } = action;
    const response = (yield activateAccountWithOtpApi(payload)) as AxiosResponse<ActivateAccountWithOtpApiReturns>;
    if (response?.status !== 200) {
      yield put(requestActivateAccountWithOtpFail.action({}));
      return;
    }
    yield put(requestActivateAccountWithOtpSuccess.action({}));
  }),
);
export default requestActivateAccountWithOtp;
