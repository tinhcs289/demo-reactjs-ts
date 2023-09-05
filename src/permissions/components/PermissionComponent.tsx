import type { PermissionClause } from '@/types';
import type { ComponentType, ReactNode } from 'react';
import { useMemo } from 'react';
import useAppPermissions from '../hooks/useAppPermissions';
export type PermissionComponentProps = {
  /**
   * Each `function|view|component` in the Application will correspond to a number of permissions. If the current user has those permissions, the `function|view|component` will be available. Otherwise, the `function|view|component` must be invisibled or disabled.
   */
  If: PermissionClause;
  children?: ReactNode;
  /**
   * fallback `Component` will be render if the children component do not pass the clause
   */
  fallbackComponent?: ComponentType<any>;
  /**
   * fallback `ReactNode` will be render if the children component do not pass the clause
   */
  fallbackRender?: ReactNode;
};
/**
 * Wrapping a `Component` which is permitted to be visibled by a `PermissionClause` from the object `ALLOWED_TO_USE` in `@/permissions/constants`.
 * If the permissions do not match, a "fallback" Component will be visibled.
 * @param clause 
 * @example
   import { ALLOWED_TO_USE, withSwitchableVisiblityByPermissions } from '@/permissions';
   .....
   <PermissionComponent If={ALLOWED_TO_USE.someFeature} fallbackComponent={NotPermittedComponent}>
    <SomeComponent />
   </PermissionComponent>
 */
export default function PermissionComponent(props: PermissionComponentProps) {
  const { If, children, fallbackComponent: Fallback, fallbackRender } = props;
  const { isAllowed } = useAppPermissions(If);
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
