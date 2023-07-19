import authentication from '@/browser/localStorage/authentication';
import PATHS from '@/constants/paths';
import type { ComponentType } from 'react';
import { useEffect } from 'react';
import type { DashboardProps } from './_types';
function redirectToLogout() {
  window?.location?.replace?.(PATHS.login);
}
export default function withAuthChangeWarning(WrappedComponent: ComponentType<DashboardProps>) {
  return function DashboardWithAuthChangeWarning(props: DashboardProps) {
    useEffect(() => {
      authentication.onChange((event, detail) => {
        if (!detail) return;
        const { value, previousValue } = detail;
        if (!value?.accessToken) {
          redirectToLogout();
          return;
        }
        if (!previousValue?.accessToken) return;
        if (previousValue.accessToken === value.accessToken) return;
        redirectToLogout();
        return;
      });
    }, []);
    return <WrappedComponent {...props} />;
  };
}
