export type Permission = {
  id?: string | number;
  key: string;
  name: string;
};
export type Roles = {
  id?: string | number;
  key: string;
  name: string;
  permissions?: Permission[];
};
/**
 * The comparative clause which define the permissions corresponding to `function|view|component`.
 * Each `function|view|component` in the Application will correspond to a number of permission.
 * If the current user has those permissions, the `function|view|component` will be available.
 * Otherwise, the `function|view|component` must be invisibled or disabled.
 */
export type PermissionClause = {
  /**
   * - `matchAll` This type means the permission check will return `true` if the user has all the permissions of `permissions`.
   * - `oneOf` This type means the permission check will return `true` if the user has one of the permissions of `permissions`
   */
  type: 'oneOf' | 'matchAll';
  /**
   * Array of permisstion key as string or a nested clause
   */
  permissions: Array<string | PermissionClause>;
};
