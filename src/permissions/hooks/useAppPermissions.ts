import { userPermissionsSelector } from '@/redux/authentication';
import type { PermissionClause } from '@/types';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import isAllowedIf from '../functions/isAllowedIf';
/**
 * check the ability to use a `function|view|component` by a `PermissionClause` from the object `ALLOWED_TO_USE` in `@/permissions`
 * @param clause Each `function|view|component` in the Application will correspond to a number of permissions. If the current user has those permissions, the `function|view|component` will be available. Otherwise, the `function|view|component` must be invisibled or disabled.
 * @example
   import { ALLOWED_TO_USE, useAppPermissions } from '@/permissions';
   .....
   const { isAllowed } = useAppPermissions(ALLOWED_TO_USE.someFeature);
   .....
   // do something with isAllowed
 */
export default function useAppPermissions(clause: PermissionClause) {
  const userPolicies = useSelector(userPermissionsSelector);
  const isAllowed = useMemo(() => isAllowedIf(userPolicies).matchesWith(clause), [userPolicies, clause]);
  return { isAllowed };
}
