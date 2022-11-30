import PATHS from '@/routes/paths';
import React from 'react';
import type { ILogoutPage } from './_types';

const redirectToLogin = () => {
  if (!(!!window && !!window?.location && typeof window.location.replace === 'function')) return;

  window.location.replace(PATHS.login);
};

const withLogoutAction = (WrappedComponent: React.FC<ILogoutPage>) => (props: ILogoutPage) => {
  const { onLogout: _, ...otherProps } = props;

  const handleLogout = () => {
    //TODO: logic logout here
    // call api or workaround function for logout
    // after request success or execution success
    // hard redirect to login
    redirectToLogin();
  };

  return <WrappedComponent {...otherProps} onLogout={handleLogout} />;
};
export default withLogoutAction;
