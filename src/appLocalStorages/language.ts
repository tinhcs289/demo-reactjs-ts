import { newLocalStorageItem } from '@/helpers/localStorageHelpers';
import type { TAcceptLanguage } from '@/types';

const language = newLocalStorageItem<TAcceptLanguage>({ key: 'i18nextLng' });
export default language;
