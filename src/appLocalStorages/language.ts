import localStorageGetItem from '@/helpers/localStorageHelpers/localStorageGetItem';
import localStorageUpdateItem from '@/helpers/localStorageHelpers/localStorageUpdateItem';
import type { TLsItem } from '@/helpers/localStorageHelpers/_types';
import { TAcceptLanguage } from '@/_types/TAcceptLanguage';

const KEY = 'ls:languageCode';

const language: TLsItem<TAcceptLanguage | null> = {
  key: KEY,
  get: () => localStorageGetItem(KEY),
  set: (val) => localStorageUpdateItem(KEY, val),
};
export default language;
