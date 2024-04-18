import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
export type AxiosRefreshTokenApi = (
  payload: { refreshToken: string },
  axiosInstance: AxiosInstance
) => Promise<
  AxiosResponse<{
    user: { [x: string]: any };
    jwt: {
      accessToken: string;
      refreshToken: string;
      expires: number;
    };
    hasNotBeenActivated?: boolean;
  }>
>;
export type AxiosInterceptorsHandler = {
  getAccessToken: () => string | undefined | null;
  getRefreshToken: () => string | undefined | null;
  getLanguage?: () => string | undefined | null;
  //
  onRefreshToken: AxiosRefreshTokenApi;
  isRefreshing: boolean;
  setIsRefresingInOtherTabs: (Is: boolean) => void;
  //
  onRefreshTokenFail: () => void;
  onForceLogout: () => void;
  onUpdateAuthentication: (newAuth: any) => void;
  // custom handlers
  onNetworkError?: (error?: AxiosError<any, any>) => void;
  onTimeOut?: (error?: AxiosError<any, any>) => void;
  onCORS?: (error?: AxiosError<any, any>) => void;
  onInternalServerError?: (error?: AxiosError<any, any>) => void;
  onBadRequest?: (error?: AxiosError<any, any>) => void;
  onNotFound?: (error?: AxiosError<any, any>) => void;
  onErrorStatus?: { [x: number]: (error?: AxiosError<any, any>) => void };
};
