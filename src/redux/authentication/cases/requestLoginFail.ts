import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import { actions as snackbar } from '@/redux/snackbar';
import { i18n } from '@/translation';
import { put, takeLatest } from 'redux-saga/effects';
import type { State } from '../state';
import { rootName } from '../state';
import clearStatusOfRequestLogin from './clearStatusOfRequestLogin';
const TYPE = `${rootName}/requestLogin_fail`;
export const requestLoginFail = createCase<any, State>(
  TYPE,
  (action, state) => {
    return {
      ...(state as any),
      loginRequestStatus: EApiRequestStatus.REQUESTFAIL,
    };
  },
  takeLatest(TYPE, function* (action: ReduxAction<any>) {
    yield put(snackbar.pushMessageError({ content: i18n.t('common:somethingWentWrong_pleaseTryAgainLater') }));
    yield put(clearStatusOfRequestLogin.action({}));
  }),
);
export default requestLoginFail;