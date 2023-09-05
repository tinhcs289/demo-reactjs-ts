import type { PermissionClause } from '@/types';
import type { ComponentType } from 'react';
import useAppPermissions from '../hooks/useAppPermissions';
/**
 * Create a new `Component` which is permitted to be visibled by a `PermissionClause` from the object `ALLOWED_TO_USE` in `@/permissions`.
 * If the permissions do not match, a "fallback" Component will be visibled.
 * @param clause Each `function|view|component` in the Application will correspond to a number of permissions. If the current user has those permissions, the `function|view|component` will be available. Otherwise, the `function|view|component` must be invisibled or disabled.
 * @example
   import { ALLOWED_TO_USE, withSwitchableVisiblityByPermissions } from '@/permissions';
   .....
   const ComponentPermitted = withSwitchableVisiblityByPermissions(ALLOWED_TO_USE.someFeature)(Component, Fallback);
   .....
   <ComponentPermitted> .... </ComponentPermitted>
 */
export default function withSwitchableVisiblityByPermissions(clause: PermissionClause) {
  return function withSwitchableVisiblityByPermissionsHoc(
    WrappedComponent: ComponentType<any>,
    OtherwiseComponent: ComponentType<any>
  ): ComponentType<any> {
    return function ComponentWithPermissions(props: any) {
      const { isAllowed } = useAppPermissions(clause);
      return !isAllowed ? <OtherwiseComponent {...props} /> : <WrappedComponent {...props} />;
    };
  };
}
