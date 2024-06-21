import type { LoginApiReturns } from '@/api/authentication/loginApi';
import { HttpRequestStatus } from '@/constants/apiRequestStatus';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import { actions as snackbar } from '@/redux/snackbar';
import { i18n } from '@/translation';
import type { AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import type { State } from '../../state';
import { rootName } from '../../state';
import clearStatusOfRequestLogin from './requestLogin.clear';
const TYPE = `${rootName}/requestLogin_fail`;
type Payload = { response: AxiosResponse<LoginApiReturns> };
export const requestLoginFail = createCase<Payload, State>(
  TYPE,
  (_action, state) => {
    return {
      ...(state as any),
      loginRequestStatus: HttpRequestStatus.REQUESTFAIL,
    };
  },
  takeLatest(TYPE, function* (_action: ReduxAction<Payload>) {
    yield put(
      snackbar.pushMessageError({ content: i18n.t('common:somethingWentWrong_pleaseTryAgainLater') })
    );
    yield put(clearStatusOfRequestLogin.action({}));
  })
);
export default requestLoginFail;
