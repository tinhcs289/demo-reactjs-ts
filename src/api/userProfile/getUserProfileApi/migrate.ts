import { default as aequitasMigrate } from './migrate.aequitas';
import { default as defaultMigrate } from './migrate.default';
export const migrate = {
  DEFAULT: defaultMigrate,
  AEQUITAS: aequitasMigrate,
};
