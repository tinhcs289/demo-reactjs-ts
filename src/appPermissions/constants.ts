import type { PermissionClause } from '@/types';
import permisionMap from './permission-map.json';
type PermissionMap = { [key in keyof typeof permisionMap]: PermissionClause };
export const FEATURE = permisionMap as PermissionMap;
