import logoutApi from '@/api/authentication/logoutApi';
import PATHS from '@/constants/paths';
import callHttp from '@/helpers/asyncHelpers/callHttp';
import userDataStorage from '@/browser/userDataStorage';
import type { ComponentType } from 'react';
import { useState } from 'react';
import type { LogoutPageProps } from '../_types';
const redirectToNextPage = () => {
  if (!(!!window && !!window?.location && typeof window.location.replace === 'function')) return;
  window.location.replace(PATHS.login);
};
export default function withLogoutAction(WrappedComponent: ComponentType<LogoutPageProps>) {
  return function LogoutPageWithLogoutAction(props: LogoutPageProps) {
    const { onLogout: _, loading: loadingProp, ...otherProps } = props;
    const [loading, setLoading] = useState<boolean>(!!loadingProp);
    const handleLogout = async () => {
      setLoading(true);
      await callHttp(logoutApi).waitForNothing();
      userDataStorage.clear();
      redirectToNextPage();
      setLoading(false);
      return;
    };
    return <WrappedComponent {...otherProps} loading={loading} onLogout={handleLogout} />;
  };
}
