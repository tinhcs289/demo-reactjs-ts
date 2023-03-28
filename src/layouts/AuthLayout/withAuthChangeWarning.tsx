import authentication from '@/appLocalStorages/authentication';
import PATHS from '@/constants/paths';
import type { ComponentType } from 'react';
import { useEffect } from 'react';
import type { AuthLayoutProps } from './_types';
export default function withAuthChangeWarning(WrappedComponent: ComponentType<AuthLayoutProps>) {
  return function AuthLayoutWithAuthChangeWarning(props: AuthLayoutProps) {
    useEffect(() => {
      authentication.onChange((event, detail) => {
        if (!detail?.value?.accessToken) return;
        window?.location?.replace?.(PATHS.dashboard);
      });
    }, []);
    return <WrappedComponent {...props} />;
  };
}
