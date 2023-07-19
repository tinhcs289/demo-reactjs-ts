import { newLocalStorageItem } from '@/helpers/localStorageHelpers';
import type { AcceptLanguage } from '@/types';

const language = newLocalStorageItem<AcceptLanguage>({ key: 'i18nextLng' });
export default language;
