import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import handler from './http.interceptorHandler';
let retryQueue: { resolve: any; reject: any }[] = [];
const retryOrClearRequests = (error: any, token: string | null) => {
  retryQueue.forEach((prom) => (error ? prom.reject(error as any) : prom.resolve(token as any)));
  retryQueue = [];
};
export default function interceptors(http?: AxiosInstance) {
  if (!http) return;
  console.log('Interceptors were added to Axios instance');
  http.interceptors.request.use(
    function onFulfilled(config) {
      if (!!config?.headers) {
        config.headers['Access-Control-Allow-Origin'] = '*';
        config.headers['Accept'] = 'application/json';
        config.headers['Content-Type'] = 'application/json';
        const lang = handler?.getLanguage?.();
        if (!!lang) {
          config.headers['Accept-Language'] = lang;
        }
        const token = handler.getAccessToken();
        if (token) config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    async function onRejected(error) {
      return Promise.reject(error);
    }
  );
  http.interceptors.response.use(
    function onFulfilled(response) {
      return response;
    },
    async function onRejected(error: AxiosError<any>): Promise<void | AxiosResponse<any>> {
      // Network error
      if (!error || !error?.config) {
        handler?.onNetworkError?.(error);
        return Promise.resolve(error as any);
      }
      // CORS
      const isCrossDomainError = !error?.response;
      if (isCrossDomainError) {
        handler?.onCORS?.(error);
        return Promise.resolve(error as any);
      }
      // Request timeout
      const isTimeOut = error?.code === 'ECONNABORTED';
      if (isTimeOut) {
        handler?.onTimeOut?.(error);
        return Promise.resolve(error as any);
      }
      // Internal server error
      const isInternalServerError = error?.response?.status === 500;
      if (isInternalServerError) {
        handler?.onInternalServerError?.(error);
        return Promise.resolve(error.response);
      }
      // Bad request
      const isBadRequest = error?.response?.status === 400;
      if (isBadRequest) {
        handler?.onBadRequest?.(error);
        return Promise.resolve(error.response);
      }
      // Not found
      const isNotFound = error?.response?.status === 404;
      if (isNotFound) {
        handler?.onNotFound?.(error);
        return Promise.resolve(error.response);
      }
      // Unauthenticated
      const isTokenExpired = error?.response?.status === 401 && !handler.isRefreshing;
      if (isTokenExpired) {
        console.log('token expired');
        // pending requests and push into retry queue
        if (handler.isRefreshing) {
          return new Promise((resolve, reject) => retryQueue.push({ resolve, reject }))
            .then((accessToken) => {
              if (!!error?.config?.headers) {
                error.config.headers.Authorization = `Bearer ${accessToken}`;
              }
              return http(error.config as any);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }
        handler.isRefreshing = true;
        handler.setIsRefresingInOtherTabs(true);
        const refreshToken = handler.getRefreshToken();
        if (!refreshToken) {
          handler.onForceLogout();
          return Promise.reject(error);
        }
        // execute token refreshing process
        console.log('refreshing......');
        return new Promise((resolve, _reject) => {
          handler
            .onRefreshToken({ refreshToken }, http)
            .then(({ data }) => {
              if (!data?.jwt?.accessToken || !data?.jwt?.refreshToken) {
                handler.onRefreshTokenFail();
              } else {
                handler.onUpdateAuthentication(data.jwt);
                if (!!error?.config?.headers) {
                  error.config.headers.Authorization = `Bearer ${data.jwt.accessToken}`;
                  // TODO [Refresh token] Accept-Language
                  // const langInToken = lodash.get(data, 'some-props-which-include-language');
                  // const lang = language.get();
                  // if (lang !== langInToken) {
                  //   error.config.headers.['Accept-Language'] = langInToken;
                  // }
                }
                retryOrClearRequests(null, data.jwt.accessToken);
                resolve(http(error.config as any));
                console.log('updated token');
              }
            })
            .catch((err) => {
              retryOrClearRequests(err, null);
              handler.onRefreshTokenFail();
            })
            .finally(() => {
              handler.isRefreshing = false;
              handler.setIsRefresingInOtherTabs(false);
            });
        });
      }
      // unknown
      const isUnknownError = error?.code === 'ERR_BAD_REQUEST';
      if (isUnknownError) {
        handler?.onBadRequest?.(error);
        return Promise.resolve(error as any);
      }
      return Promise.reject(error);
    }
  );
}
