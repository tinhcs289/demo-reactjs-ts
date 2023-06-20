import refreshAuthenticateTokenApi from '@/api/authentication/refreshAuthenticateTokenApi';
import authentication from '@/appCookies/authentication';
import language from '@/appLocalStorages/language';
import { actions as sessionAction } from '@/redux/session';
import store from '@/redux/store';
import type { AxiosError, AxiosResponse } from 'axios';
import Axios from 'axios';
const showWarning = () => {
  store.dispatch(sessionAction.sessionTimeoutWarningShow({}));
};
const doLogout = () => {
  //TODO [logout] logout immediately or show waring then logout by user click
  store.dispatch(sessionAction.sessionTimeoutWarningShow({}));
};
const http = Axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  timeout: 30000,
  //withCredentials: true,
});
let isRefreshing = false;
let failedQueue: { resolve: any; reject: any }[] = [];
const processQueue = (error: any, token: string | null) => {
  failedQueue.forEach((prom) => (error ? prom.reject(error as any) : prom.resolve(token as any)));
  failedQueue = [];
};
http.interceptors.request.use(
  (config) => {
    if (!!config?.headers?.common) {
      config.headers['Access-Control-Allow-Origin'] = '*';
      config.headers['Accept'] = 'application/json';
      config.headers['Content-Type'] = 'application/json';
      const lang = language.get();
      if (!!lang) {
        config.headers['Accept-Language'] = lang;
      }
      const token = authentication.get()?.accessToken;
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>): Promise<void | AxiosResponse<any>> => {
    if (!error || !error?.config) return Promise.reject(error as any);
    const isTimeOut = error?.code === 'ECONNABORTED';
    if (isTimeOut) return Promise.resolve(error as any);
    const isCrossDomainError = !error?.response;
    if (isCrossDomainError) return Promise.resolve(error as any);
    const isInternalServerError = error?.response?.status === 500;
    if (isInternalServerError) return Promise.resolve(error.response);
    const isBadRequest = error?.response?.status === 400;
    if (isBadRequest) return Promise.resolve(error.response);
    const isNotFound = error?.response?.status === 404;
    if (isNotFound) return Promise.resolve(error.response);
    const isTokenExpired = error?.response?.status === 401 && !isRefreshing;
    if (isTokenExpired) {
      console.log('token expired');
      if (isRefreshing) {
        return new Promise((resolve, reject) => failedQueue.push({ resolve, reject }))
          .then((accessToken) => {
            if (!!error?.config?.headers) error.config.headers.Authorization = `Bearer ${accessToken}`;
            return http(error.config as any);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
      isRefreshing = true;
      const refreshToken = authentication.get()?.refreshToken;
      if (refreshToken) {
        console.log('refreshing......');
        return new Promise((resolve, reject) => {
          refreshAuthenticateTokenApi({ refreshToken }, http)
            .then(({ data }) => {
              if (!data?.jwt?.accessToken || !data?.jwt?.refreshToken) {
                showWarning();
              } else {
                authentication.set(data.jwt);
                Axios.defaults.headers.common['Authorization'] = `Bearer ${data.jwt.accessToken}`;
                if (!!error?.config?.headers)
                  error.config.headers.Authorization = `Bearer ${data.jwt.accessToken}`;

                //TODO [Refresh token] More handle for refreshing access token flow
                // incase token includes `Accept-Language` and it changes header key should be update to
                // use this code
                //
                // const lang = language.get();
                // if (lang !== langInToken) {
                //   Axios.defaults.headers.common['Accept-Language'] = langInToken;
                //   if (!!error?.config?.headers) error.config.headers.['Accept-Language'] = langInToken;
                // }
                processQueue(null, data.jwt.accessToken);
                resolve(http(error.config as any));
                console.log('updated token');
              }
            })
            .catch((err) => {
              processQueue(err, null);
              showWarning();
            })
            .finally(() => {
              isRefreshing = false;
            });
        });
      } else {
        doLogout();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
export default http;
