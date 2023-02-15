import authentication from '@/appLocalStorages/authentication';
import PATHS from '@/routes/paths';
import type { ComponentType } from 'react';
import { useEffect } from 'react';
import type { IAuthLayoutProps } from './_types';

const withAuthChangeWarning =
  (WrappedComponent: ComponentType<IAuthLayoutProps>) => (props: IAuthLayoutProps) => {
    useEffect(() => {
      authentication.onChange((event, detail) => {
        if (!detail?.value?.accessToken) return;
        window?.location?.replace?.(PATHS.dashboard);
      });
    }, []);

    return <WrappedComponent {...props} />;
  };
export default withAuthChangeWarning;
