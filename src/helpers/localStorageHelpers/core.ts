//@ts-ignore
// export type LocalStorageItemGetter<T> = () => T | null | undefined;
// export type LocalStorageItemSetter<T> = (value: T | null | undefined) => void;
// export type LocalStorageSyncItemSetter<T> = (
//   value: T | null | undefined,
//   stopListenerInThisTab?: boolean
// ) => void;
// export type LocalStorageItemValidator<T> = (value: T | null) => boolean;
// export type LocalStorageItemMigrate<T> = (value: string) => T | null;
// export type LocalStorageItem<T> = {
//   key: string;
//   get: LocalStorageItemGetter<T>;
//   set: LocalStorageItemSetter<T>;
//   clear: () => void;
// };
// export function localStorageRemoveItem(key: string) {
//   if (!key) return;
//   if (typeof Storage === 'undefined') return;
//   if (typeof window === 'undefined') return;
//   if (typeof window.localStorage === 'undefined') return;
//   if (typeof window.localStorage.removeItem !== 'function') return;
//   return window.localStorage.removeItem(key);
// }
// export function localStorageUpdateItem<T>(key: string, value: T) {
//   if (!key) return;
//   if (typeof Storage === 'undefined') return;
//   if (typeof window === 'undefined') return;
//   if (typeof window.localStorage === 'undefined') return;
//   if (typeof window.localStorage.setItem !== 'function') return;
//   let shouldBreak = false;
//   let stringifiedValue: string | undefined;
//   try {
//     stringifiedValue = JSON.stringify(value);
//   } catch (error) {
//     // the most common case that exception occurs is the `value` is not a plain object,
//     // and contains properties with some complex type like File, JSX.Element, Function, ReactNode, ...
//     shouldBreak = true;
//     console.warn(error);
//   }
//   if (shouldBreak) return;
//   if (typeof stringifiedValue !== 'string') return;
//   return window.localStorage.setItem(key, stringifiedValue);
// }
// export function localStorageGetItem<T>(
//   /**
//    * the key in the LocalStorage.
//    */
//   key: string,
//   /**
//    * A function for validating the type of the current value of the `key` which was stored in the LocalStorage.
//    * the `validate` function will returns `true` if the current value matches with the type of T, otherwise returns `false`.
//    */
//   validate?: LocalStorageItemValidator<T>,
//   /**
//    * if the current value of the `key` which was stored in the LocalStorage has a conflict type with T,
//    * the `migrate` function will be used to convert or re-model the value into the type of T.
//    * This will help the `localStorageGetItem` function always returns a valid value or null.
//    */
//   migrate?: LocalStorageItemMigrate<T>,
//   /**
//    * if the current value of the `key` which was stored in the LocalStorage has a conflict type with T,
//    * provide the `overrideValueIfInvalid` to `true`/`false` to update the value in the LocalStorage with a new valid value or clear if the new value are null.
//    */
//   overrideValueIfInvalid?: boolean
// ): T | null {
//   if (!key) return null;
//   if (typeof Storage === 'undefined') return null;
//   if (typeof window === 'undefined') return null;
//   if (typeof window.localStorage === 'undefined') return null;
//   if (typeof window.localStorage.getItem !== 'function') return null;
//   const value = window.localStorage.getItem(key);
//   if (!value) return null;
//   let returns = null;
//   let isInvalid = false;
//   try {
//     const val = JSON.parse(value) as T;
//     if (typeof validate === 'function') {
//       if (validate(val) === true) returns = val;
//       else {
//         isInvalid = true;
//         if (typeof migrate !== 'function') returns = null;
//         else returns = migrate(value || '');
//       }
//     } else returns = val;
//   } catch (error) {
//     returns = value as T;
//   } finally {
//     if (isInvalid && !!overrideValueIfInvalid) {
//       if (returns === null) localStorageRemoveItem(key);
//       else localStorageUpdateItem(key, returns);
//     }
//     return returns;
//   }
// }
// export type CreateNewLocalStorageItemArgs<T> = Partial<Omit<LocalStorageItem<T>, 'key'>> & {
//   key: string;
//   validate?: LocalStorageItemValidator<T>;
//   migrate?: LocalStorageItemMigrate<T>;
//   overrideValueIfInvalid?: boolean;
// };
// export function newLocalStorageItem<T>(args: CreateNewLocalStorageItemArgs<T>) {
//   return {
//     key: args.key,
//     get:
//       args?.get ||
//       (() => localStorageGetItem(args.key, args?.validate, args?.migrate, args?.overrideValueIfInvalid)),
//     set: args?.set || ((value: T | null | undefined) => localStorageUpdateItem(args.key, value)),
//     clear: args?.clear || (() => localStorageRemoveItem(args.key)),
//   } as LocalStorageItem<T>;
// }
export const name = 'core';
