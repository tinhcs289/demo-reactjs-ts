import type { Permission, PermissionClause } from '@/types';
function comparePermissions(clause: PermissionClause, userPolicies: Permission[]): boolean {
  if (clause?.type !== 'matchAll' && clause?.type !== 'oneOf') return true;
  const featurePers = clause?.permissions;
  if (!(featurePers instanceof Array && featurePers.length > 0)) return true;
  const userPers = userPolicies?.map?.((p) => p?.key).filter((p) => !!p);
  if (userPers.length === 0) return false;
  const loopSteps = featurePers.length;
  if (clause.type === 'matchAll') {
    let isMatch = true,
      i = 0;
    while (isMatch && i < loopSteps) {
      const keyOrClause = featurePers[i];
      if (typeof keyOrClause === 'string') {
        // eslint-disable-next-line no-loop-func
        if (userPers.some((p) => p === featurePers[i])) {
          i++;
        } else {
          isMatch = false;
        }
      } else {
        const _isMatch = comparePermissions(keyOrClause, userPolicies);
        if (_isMatch) i++;
        else isMatch = false;
      }
    }
    return isMatch;
  }
  if (clause.type === 'oneOf') {
    let isMatch = false,
      i = 0;
    while (!isMatch && i < loopSteps) {
      const keyOrClause = featurePers[i];
      if (typeof keyOrClause === 'string') {
        // eslint-disable-next-line no-loop-func
        if (userPers.some((p) => p === featurePers[i])) {
          isMatch = true;
        } else {
          i++;
        }
      } else {
        const _isMatch = comparePermissions(keyOrClause, userPolicies);
        if (!_isMatch) i++;
        else isMatch = true;
      }
    }
    return isMatch;
  }
  return true;
}
/**
 * @param userPolicies the array of permission policies of current users
 * @returns 
 * @example
    const isAllowed = isAllowedIf(currentUserPolicies).matchesWith(
        oneOf(
            'xem-chi-tiet-nhiem-vu',
            'van-ban-di-giu-so',
            'van-ban-di-huy-duyet',
            'quan-ly-uy-quyen',
            'van-ban-di-xin-y-kien',
            matchAll(
            'nhiem-vu-danh-sach-nhiem-vu-don-vi',
            'van-ban-den-danh-sach-cho-cho-y-kien',
            'cap-nhat-tinh-hinh-thuc-hien',
            oneOf('xem-chi-tiet-nhiem-vu', 'van-ban-di-giu-so')
            )
        )
    );
*/
export default function isAllowedIf(userPolicies: Permission[]) {
  return {
    /**
     * @param clause the comparative clause which define the permissions corresponding to function
     * @returns
     */
    matchesWith: function (clause: PermissionClause) {
      return comparePermissions(clause, userPolicies);
    },
  };
}
