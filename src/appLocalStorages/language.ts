import localStorageGetItem from '@/helpers/localStorageHelpers/localStorageGetItem';
import localStorageUpdateItem from '@/helpers/localStorageHelpers/localStorageUpdateItem';
import type { TLsItem } from '@/helpers/localStorageHelpers/_types';

const KEY = 'ls:languageCode';

const language: TLsItem<'vi' | 'en'> = {
  key: KEY,
  get: () => localStorageGetItem(KEY),
  set: (val) => localStorageUpdateItem(KEY, val),
};
export default language;
