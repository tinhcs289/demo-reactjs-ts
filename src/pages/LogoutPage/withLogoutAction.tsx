import logoutApi from '@/api/authentication/logoutApi';
import authentication from '@/appCookies/authentication';
import PATHS from '@/routes/paths';
import type { FC } from 'react';
import { useState } from 'react';
import type { ILogoutPage } from './_types';
import { default as authenticationInLocalStorage } from '@/appLocalStorages/authentication';

const redirectToNextPage = () => {
  if (!(!!window && !!window?.location && typeof window.location.replace === 'function')) return;
  window.location.replace(PATHS.login);
};

const withLogoutAction = (WrappedComponent: FC<ILogoutPage>) => (props: ILogoutPage) => {
  const { onLogout: _, loading: loadingProp, ...otherProps } = props;

  const [loading, setLoading] = useState<boolean>(!!loadingProp);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutApi();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      authentication.clear();
      authenticationInLocalStorage.set(null);
      redirectToNextPage();
    }
  };

  return <WrappedComponent {...otherProps} loading={loading} onLogout={handleLogout} />;
};
export default withLogoutAction;
