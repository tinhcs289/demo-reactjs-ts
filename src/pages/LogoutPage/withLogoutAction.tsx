import PATHS from '@/routes/paths';
import { useState } from 'react';
import type { FC } from 'react';
import type { ILogoutPage } from './_types';
import authentication from '@/appCookies/authentication';
import logoutApi from '@/api/authentication/logoutApi';

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
      authentication.set(null);
      redirectToNextPage();
    }
  };

  return <WrappedComponent {...otherProps} loading={loading} onLogout={handleLogout} />;
};
export default withLogoutAction;
