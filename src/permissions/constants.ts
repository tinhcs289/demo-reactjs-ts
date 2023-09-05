import type { PermissionClause } from '@/types';
import permisionMap from './permission-map.json';
export type PermissionMap = { [key in keyof typeof permisionMap]: PermissionClause };
export const ALLOWED_TO_USE = permisionMap as PermissionMap;
