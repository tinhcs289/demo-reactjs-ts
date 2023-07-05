import type { PermissionClause } from '@/types';
/**
 * create PermissionClause to pass to the `isAllowedIfHasPermission` function.
 * This clause means `isAllowedIfHasPermission` will return `true` if the user has one of the permissions of `permissions`
 * @param permissions 
 * @example
    const clause = oneOf(
      'xem-chi-tiet-nhiem-vu',
      'van-ban-di-giu-so',
      'van-ban-di-huy-duyet',
      'quan-ly-uy-quyen',
      'van-ban-di-xin-y-kien',
    );
 */
export default function oneOf(...permissions: Array<string | PermissionClause>): PermissionClause {
  return { type: 'oneOf', permissions };
}
