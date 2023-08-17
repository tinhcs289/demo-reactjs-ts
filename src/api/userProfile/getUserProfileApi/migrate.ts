import getBackendEndpointKey from '@/environments/getBackendEndpointKey';
import { default as defaultMigrate } from './migrate.default';
import { default as qlvbMigrate } from './migrate.qlvb';
// import more migration here;
export const migrations = {
  EXAMPLE: defaultMigrate,
  QLVB: qlvbMigrate,
  // ... defined migrations here
};
const KEY = getBackendEndpointKey();
export const { migratePayload, migrateResponseData } = migrations[KEY as keyof typeof migrations];
