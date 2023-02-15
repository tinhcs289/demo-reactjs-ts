import newLocalStorageItem from '@/helpers/localStorageHelpers/newLocalStorageItem';
import type { TAcceptLanguage } from '@/types';

const language = newLocalStorageItem<TAcceptLanguage>({ key: 'i18nextLng' });
export default language;
