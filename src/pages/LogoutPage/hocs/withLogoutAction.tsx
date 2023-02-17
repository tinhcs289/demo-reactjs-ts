import logoutApi from '@/api/authentication/logoutApi';
import tryCall from '@/api/tryCall';
import authentication from '@/appCookies/authentication';
import { default as authenticationInLocalStorage } from '@/appLocalStorages/authentication';
import PATHS from '@/routes/paths';
import type { ComponentType } from 'react';
import { useState } from 'react';
import type { ILogoutPage } from '../_types';

const redirectToNextPage = () => {
  if (!(!!window && !!window?.location && typeof window.location.replace === 'function')) return;
  window.location.replace(PATHS.login);
};

const withLogoutAction = (WrappedComponent: ComponentType<ILogoutPage>) => (props: ILogoutPage) => {
  const { onLogout: _, loading: loadingProp, ...otherProps } = props;

  const [loading, setLoading] = useState<boolean>(!!loadingProp);

  const handleLogout = async () => {
    setLoading(true);
    await tryCall(logoutApi).withNoDesire();
    authentication.clear();
    authenticationInLocalStorage.set(null, true);
    redirectToNextPage();
    setLoading(false);
    return;
  };

  return <WrappedComponent {...otherProps} loading={loading} onLogout={handleLogout} />;
};
export default withLogoutAction;
