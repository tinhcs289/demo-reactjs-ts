import type { PermissionClause } from '@/types';
import type { ComponentType, ReactNode } from 'react';
import { useMemo } from 'react';
import useAppPermissions from '../hooks/useAppPermissions';
export type PermissionComponentProps = {
  clause: PermissionClause;
  children?: ReactNode;
  fallbackComponent?: ComponentType<any>;
  fallbackRender?: ReactNode;
};
export default function PermissionComponent(props: PermissionComponentProps) {
  const { clause, children, fallbackComponent: Fallback, fallbackRender } = props;
  const { isAllowed } = useAppPermissions(clause);
  const $Returns = useMemo(() => {
    if (!isAllowed) {
      if (!!Fallback) return <Fallback />;
      if (!!fallbackRender) return fallbackRender;
      return null;
    }
    return children;
  }, [isAllowed, children, Fallback, fallbackRender]);
  return <>{$Returns}</>;
}
