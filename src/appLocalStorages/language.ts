import newLocalStorageItem from '@/helpers/localStorageHelpers/newLocalStorageItem';
import type { TAcceptLanguage } from '@/_types/TAcceptLanguage';

const language = newLocalStorageItem<TAcceptLanguage>({ key: 'ls:languageCode' });
export default language;
