import loginApi from '@/api/authentication/loginApi';
import tryCall from '@/functions/tryCall';
import authentication from '@/appCookies/authentication';
import { default as authenticationInLocalStorage } from '@/appLocalStorages/authentication';
import useSnackbarNotify from '@/hooks/useSnackbarNotify';
import PATHS from '@/constants/paths';
import type { ComponentType } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { LoginPageProps, LoginFormData } from '../_types';
const redirectToNextPage = (returnUri?: string) => {
  if (!(!!window && !!window?.location && typeof window.location.replace === 'function')) return;
  window.location.replace(returnUri || PATHS.dashboard);
};
export default function withLoginViaInternalApi(WrappedComponent: ComponentType<LoginPageProps>) {
  return function LoginPageWithLoginViaInternalApi(props: LoginPageProps) {
    const { onRequestLoginViaSSO: _, loading: loadingProp, returnUri, ...otherProps } = props;
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(!!loadingProp);
    const { showErrorNotify } = useSnackbarNotify();
    const handleRequestLoginViaApi = async (fd: LoginFormData): Promise<void> => {
      if (!fd?.Account || !fd?.Password) return;
      const payload = {
        username: fd?.Account,
        password: fd?.Password,
      };
      setLoading(true);
      const [data, error] = await tryCall(loginApi, payload).desireSuccessWith(
        (r) => !!r?.data?.jwt?.accessToken && !!r?.data?.jwt?.refreshToken
      );
      setLoading(false);
      if (error) {
        if (error === 'REQUEST_ERROR') showErrorNotify(t('somethingWentWrong_pleaseTryAgainLater'));
        showErrorNotify(t('login:invalidAccountOrPassword'));
        return;
      }
      authentication.set(data.jwt);
      authenticationInLocalStorage.set(data.jwt, true);
      redirectToNextPage(returnUri);
      return;
    };
    return (
      <WrappedComponent {...otherProps} loading={loading} onSubmitLoginForm={handleRequestLoginViaApi} />
    );
  };
}
