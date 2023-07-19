import authentication from '@/browser/localStorage/authentication';
import PATHS from '@/constants/paths';
import type { ComponentType } from 'react';
import { useEffect } from 'react';
import type { AuthLayoutProps } from './_types';
export default function withAuthChangeWarning(WrappedComponent: ComponentType<AuthLayoutProps>) {
  return function AuthLayoutWithAuthChangeWarning(props: AuthLayoutProps) {
    useEffect(() => {
      authentication.onChange((_event, detail) => {
        if (!detail?.value?.accessToken) return;
        window?.location?.replace?.(PATHS.dashboard);
      });
    }, []);
    return <WrappedComponent {...props} />;
  };
}
