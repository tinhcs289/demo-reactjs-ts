import { default as gtscMigrate } from './migrate.gtsc';
import { default as aequitasMigrate } from './migrate.aequitas';
import { default as defaultMigrate } from './migrate.default';
export const migrate = {
  DEFAULT: defaultMigrate,
  GTSC: gtscMigrate,
  AEQUITAS: aequitasMigrate,
};
