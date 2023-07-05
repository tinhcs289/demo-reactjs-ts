import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import { actions as snackbar } from '@/redux/snackbar';
import { i18n } from '@/translation';
import { put, takeLatest } from 'redux-saga/effects';
import type { State } from '../../state';
import { rootName } from '../../state';
import clearStatusOfRequestUpdatePasswordWithOldPassword from './clearStatusOfRequestUpdatePasswordWithOldPassword';
const TYPE = `${rootName}/requestUpdatePasswordWithOldPassword_fail`;
const requestUpdatePasswordWithOldPasswordFail = createCase<any, State>(
  TYPE,
  (_action, state) => {
    return {
      ...state,
      updatePasswordWithOldPasswordRequestStatus: EApiRequestStatus.REQUESTFAIL,
    };
  },
  takeLatest(TYPE, function* (_action: ReduxAction<any>) {
    yield put(snackbar.pushMessageError({ content: i18n.t('common:somethingWentWrong_pleaseTryAgainLater') }));
    yield put(clearStatusOfRequestUpdatePasswordWithOldPassword.action({}));
  }),
);
export default requestUpdatePasswordWithOldPasswordFail;
