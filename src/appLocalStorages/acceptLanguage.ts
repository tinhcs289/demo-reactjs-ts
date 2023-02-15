import newLocalStorageListenableItem from '@/helpers/localStorageHelpers/newLocalStorageListenableItem';
import type { TAcceptLanguage } from '@/types';

/**
 * @deprecated accept-language was stored as default key `i18nextLng` which defined of `i18next`
 * for common action, use `@/appLocalStorages/language`.
 * @description this key was only used for sync between tabs
 */
const acceptLanguage = newLocalStorageListenableItem<TAcceptLanguage>({ key: 'acceptLanguage' });
export default acceptLanguage;
