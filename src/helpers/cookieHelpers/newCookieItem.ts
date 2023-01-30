import cookieGetItem from '@/helpers/cookieHelpers/_core/cookieGetItem';
import cookieRemoveItem from '@/helpers/cookieHelpers/_core/cookieRemoveItem';
import cookieUpdateItem from '@/helpers/cookieHelpers/_core/cookieUpdateItem';
import type { TCookieItem } from '@/helpers/cookieHelpers/_types';

const newCookieItem = <T>(
  args: { key: string; validate?: (value: T | null) => boolean } & Partial<Omit<TCookieItem<T>, 'key'>>
): TCookieItem<T> => {
  return {
    key: args.key,
    get: args?.get || (() => cookieGetItem(args.key, args?.validate)),
    set: args?.set || ((value: T | null | undefined) => cookieUpdateItem(args.key, value)),
    clear: args?.clear || (() => cookieRemoveItem(args.key)),
  };
};
export default newCookieItem;
