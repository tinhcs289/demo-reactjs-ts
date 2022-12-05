import { default as authenticationInLocalStorage } from '@/appLocalStorages/authentication';
import PATHS from '@/routes/paths';
import { FC, useEffect } from 'react';
import type { IAuthLayoutProps } from './_types';

const withAuthChangeWarning = (WrappedComponent: FC<IAuthLayoutProps>) => (props: IAuthLayoutProps) => {
  useEffect(() => {
    authenticationInLocalStorage.onChange((event, detail) => {
      if (!detail?.value?.accessToken) return;
      window?.location?.replace?.(PATHS.dashboard);
    });
  }, []);

  return <WrappedComponent {...props} />;
};
export default withAuthChangeWarning;
