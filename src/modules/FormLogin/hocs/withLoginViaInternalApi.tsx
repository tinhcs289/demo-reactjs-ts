import loginApi from '@/api/authentication/loginApi';
import authentication from '@/appCookies/authentication';
import { default as authenticationInLocalStorage } from '@/appLocalStorages/authentication';
import PATHS from '@/constants/paths';
import callHttp from '@/functions/callHttp';
import useSnackbarNotify from '@/hooks/useSnackbarNotify';
import { Authentication } from '@/types';
import type { AxiosResponse } from 'axios';
import type { ComponentType } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { FormProps, FormValues } from '../_types';
function validAuthentication(r: AxiosResponse<Authentication>) {
  return !!r?.data?.jwt?.accessToken && !!r?.data?.jwt?.refreshToken;
}
function redirectToNextPage(returnUri?: string) {
  if (!(!!window && !!window?.location && typeof window.location.replace === 'function')) return;
  window.location.replace(returnUri || PATHS.dashboard);
}
/**
 * @deprecated
 */
export default function withLoginViaInternalApi(WrappedComponent: ComponentType<FormProps>) {
  return function FormLoginWithLoginViaInternalApi(props: FormProps) {
    const { loading: loadingProp, returnUri, ...otherProps } = props;
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(!!loadingProp);
    const { showErrorNotify } = useSnackbarNotify();
    const handleRequestLoginViaApi = async (values: FormValues): Promise<void> => {
      if (!values?.Account || !values?.Password) return;
      setLoading(true);
      const payload = { username: values?.Account, password: values?.Password };
      const [error, result] = await callHttp(loginApi(payload)).waitFor(validAuthentication);
      setLoading(false);
      if (error) {
        if (error === 'REQUEST_ERROR') showErrorNotify(t('somethingWentWrong_pleaseTryAgainLater'));
        showErrorNotify(t('login:invalidAccountOrPassword'));
        return;
      }
      authentication.set(result.jwt);
      authenticationInLocalStorage.set(result.jwt, true);
      redirectToNextPage(returnUri);
      return;
    };
    return <WrappedComponent {...otherProps} loading={loading} onSubmit={handleRequestLoginViaApi as any} />;
  };
}
