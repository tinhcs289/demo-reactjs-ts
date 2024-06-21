import refreshAuthenticateTokenApi from '@/api/authentication/refreshAuthenticateTokenApi';
import authentication from '@/browser/cookies/authentication';
import isRefreshingAccessToken from '@/browser/localStorage/isRefreshingAccessToken';
import language from '@/browser/localStorage/language';
import { actions as sessionAction } from '@/redux/session';
import store from '@/redux/store';
import type { AxiosInterceptorsHandler } from './http.types';
import type { AxiosError } from 'axios';
function logError(errorType: string, error?: AxiosError) {
  console.log(errorType, error);
  const errorWhenCallUrl = error?.request?.responseURL;
  if (!errorWhenCallUrl) {
    console.log(errorType, error);
  } else {
    console.log(`${errorType} when request to: ${errorWhenCallUrl}`, error);
  }
}
export const handler: AxiosInterceptorsHandler = {
  onRefreshToken: refreshAuthenticateTokenApi,
  isRefreshing: isRefreshingAccessToken.get() || false,
  setIsRefresingInOtherTabs: (Is) => {
    isRefreshingAccessToken.set(Is, true);
  },
  getAccessToken: () => {
    return authentication.get()?.accessToken;
  },
  getRefreshToken: () => {
    return authentication.get()?.refreshToken;
  },
  onUpdateAuthentication: (auth: any) => {
    return authentication.set(auth);
  },
  getLanguage: () => {
    return language.get();
  },
  onForceLogout: () => {
    //TODO [logout] logout immediately or show waring then logout by user click
    store.dispatch(sessionAction.sessionTimeoutWarningShow({}));
  },
  onRefreshTokenFail: () => {
    store.dispatch(sessionAction.sessionTimeoutWarningShow({}));
  },
  onNetworkError: (error) => {
    logError('network error', error);
  },
  onTimeOut: (error) => {
    logError('request timeout', error);
  },
  onCORS: (error) => {
    logError('CORS', error);
  },
  onInternalServerError: (error) => {
    logError('internal server error', error);
  },
  onBadRequest: (error) => {
    logError('bad request', error);
  },
  onNotFound: (error) => {
    logError('resources not found', error);
  },
};
isRefreshingAccessToken.onChange((_event, detail) => {
  if (typeof detail?.value !== 'boolean') return;
  handler.isRefreshing = detail.value;
});
export default handler;
