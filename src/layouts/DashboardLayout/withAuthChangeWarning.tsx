import authentication from '@/appLocalStorages/authentication';
import PATHS from '@/routes/paths';
import { FC, useEffect } from 'react';
import type { TDashboardProps } from './_types';

const withAuthChangeWarning = (WrappedComponent: FC<TDashboardProps>) => (props: TDashboardProps) => {
  useEffect(() => {
    authentication.onChange((event, detail) => {
      if (!!detail?.value?.accessToken) return;
      window?.location?.replace?.(PATHS.login);
    });
  }, []);

  return <WrappedComponent {...props} />;
};
export default withAuthChangeWarning;
