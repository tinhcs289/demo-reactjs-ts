import cookieGetItem from '@/helpers/cookieHelpers/cookieGetItem';
import cookieRemoveItem from '@/helpers/cookieHelpers/cookieRemoveItem';
import cookieUpdateItem from '@/helpers/cookieHelpers/cookieUpdateItem';
import type { TCookieItem } from '@/helpers/cookieHelpers/_types';

const newCookieItem = <T>(args: { key: string } & Partial<Omit<TCookieItem<T>, 'key'>>): TCookieItem<T> => {
  return {
    key: args.key,
    get: args?.get || (() => cookieGetItem(args.key)),
    set: args?.set || ((value: T | null | undefined) => cookieUpdateItem(args.key, value)),
    clear: args?.clear || (() => cookieRemoveItem(args.key)),
  };
};
export default newCookieItem;
