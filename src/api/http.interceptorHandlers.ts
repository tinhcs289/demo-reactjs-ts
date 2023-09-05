import { actions as sessionAction } from '@/redux/session';
import authentication from '@/browser/cookies/authentication';
import language from '@/browser/localStorage/language';
import store from '@/redux/store';
export type AxiosInterceptorsHandlers = {
  getAccessToken: () => string | undefined | null;
  getRefreshToken: () => string | undefined | null;
  getLanguage: () => string | undefined | null;
  onRefreshTokenFail: () => void;
  onForceLogout: () => void;
  onUpdateAuthentication: (newAuth: any) => void;
};
export const interceptorHandlers: AxiosInterceptorsHandlers = {
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
};
export default interceptorHandlers;
