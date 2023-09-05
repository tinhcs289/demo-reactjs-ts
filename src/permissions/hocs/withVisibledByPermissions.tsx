import type { PermissionClause } from '@/types';
import type { ComponentType } from 'react';
import useAppPermissions from '../hooks/useAppPermissions';
/**
 * Create a new `Component` which is permitted to be visibled by a `PermissionClause` from the object `ALLOWED_TO_USE` in `@/permissions`
 * @param clause Each `function|view|component` in the Application will correspond to a number of permissions. If the current user has those permissions, the `function|view|component` will be available. Otherwise, the `function|view|component` must be invisibled or disabled.
 * @example
   import { ALLOWED_TO_USE, withVisibledByPermissions } from '@/permissions';
   .....
   const ComponentPermitted = withVisibledByPermissions(ALLOWED_TO_USE.someFeature)(Component);
   .....
   <ComponentPermitted> .... </ComponentPermitted>
 */
export default function withVisibledByPermissions<T>(clause: PermissionClause) {
  return function withVisibledByPermissionsHoc(WrappedComponent: ComponentType<T>): ComponentType<T> {
    return function ComponentWithPermissions(props: T) {
      const { isAllowed } = useAppPermissions(clause);
      return !isAllowed ? null : <WrappedComponent {...(props as any)} />;
    };
  };
}
