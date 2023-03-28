import authentication from '@/appLocalStorages/authentication';
import PATHS from '@/constants/paths';
import type { ComponentType } from 'react';
import { useEffect } from 'react';
import type { DashboardProps } from './_types';
export default function withAuthChangeWarning(WrappedComponent: ComponentType<DashboardProps>) {
  return function DashboardWithAuthChangeWarning(props: DashboardProps) {
    useEffect(() => {
      authentication.onChange((event, detail) => {
        if (!!detail?.value?.accessToken) return;
        window?.location?.replace?.(PATHS.login);
      });
    }, []);
    return <WrappedComponent {...props} />;
  };
}
