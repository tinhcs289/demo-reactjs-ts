import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import { actions as snackbar } from '@/redux/snackbar';
import { i18n } from '@/translation';
import { put, takeLatest } from 'redux-saga/effects';
import type { State } from '../state';
import { rootName } from '../state';
import clearStatusOfRequestUpdatePasswordWithOtp from './clearStatusOfRequestUpdatePasswordWithOtp';
const TYPE = `${rootName}/requestUpdatePasswordWithOtp_fail`;
const requestUpdatePasswordWithOtpFail = createCase<any, State>(
  TYPE,
  (action, state) => {
    return {
      ...state,
      createOtpForResetPasswordRequestStatus: EApiRequestStatus.REQUESTFAIL,
    };
  },
  takeLatest(TYPE, function* (action: ReduxAction<any>) {
    yield put(snackbar.pushMessageError({ content: i18n.t('common:somethingWentWrong_pleaseTryAgainLater') }));
    yield put(clearStatusOfRequestUpdatePasswordWithOtp.action({}));
  }),
);
export default requestUpdatePasswordWithOtpFail;