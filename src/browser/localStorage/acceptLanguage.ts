import { newLocalStorageListenableItem } from '@/helpers/localStorageHelpers';
import type { AcceptLanguage } from '@/types';

/**
 * @deprecated accept-language was stored as default key `i18nextLng` which defined of `i18next`
 * for common action, use `@/browser/localStorage/language`.
 * @description this key was only used for sync between tabs
 */
const acceptLanguage = newLocalStorageListenableItem<AcceptLanguage>({ key: 'acceptLanguage' });
export default acceptLanguage;
