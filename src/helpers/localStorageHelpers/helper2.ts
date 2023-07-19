//@ts-ignore
// import isEqual from 'lodash/isEqual';
// import type { LocalStorageItem } from './core';
// import { localStorageGetItem, localStorageUpdateItem } from './core';
// export type LocalStorageListenableItemDictionary<ItemValue = any> = {
//   name: string;
//   value: ItemValue;
//   previousValue?: ItemValue;
// };
// export type LocalStorageListenableItemChangeEvent<ItemValue = any> = CustomEvent<
//   LocalStorageListenableItemDictionary<ItemValue>
// >;
// export type LocalStorageListenableItemChangeEventDetail<ItemValue = any> = {
//   name: string;
//   value?: ItemValue | null;
//   previousValue?: ItemValue | null;
// };
// export type LocalStorageListenableItemChangeEventHandler<ItemValue = any> = (
//   event: LocalStorageListenableItemChangeEvent<ItemValue>,
//   detail: LocalStorageListenableItemChangeEventDetail<ItemValue>
// ) => void;
// export type LocalStorageListenableItemSetter<ItemValue = any> = (
//   value: ItemValue | null | undefined,
//   stopListenerInThisTab?: boolean
// ) => void;
// export type LocalStorageListenableItem<ValueType = any> = LocalStorageItem<ValueType> & {
//   /**
//    * @example
//       auth.set(jwt)
//       // used for normal cases the change event will affect all tabs which subscribe to changes of `auth`
//    * @example
//       auth.set(jwt, true)
//       // the listener for `auth` in the current tab will be stopped till the next change happen.
//       // used in case the change event will affect other tabs not the current
//    */
//   set: LocalStorageListenableItemSetter<ValueType>;
//   onChange: (handler: LocalStorageListenableItemChangeEventHandler<ValueType>) => void;
// };
// //--------------------------------------------
// const itemDictionaries: LocalStorageListenableItemDictionary[] = [];
// let isInitialized = false;
// const prefix = 'lsSync:';
// const prefixEventName = 'ls:changes';
// const defaultSyncValue = `${prefix}default`;
// /**
//  * Array of item keys which is marked as stop event-listener in current tab
//  */
// let keysThatWereSetTurnoffListener: string[] = [];
// function __markStopListen(key: string) {
//   if (!key) return;
//   if (keysThatWereSetTurnoffListener.includes(key)) return;
//   keysThatWereSetTurnoffListener.push(key);
// }
// function __unmarkStopListen(key: string) {
//   if (!key) return;
//   if (!keysThatWereSetTurnoffListener.includes(key)) return;
//   keysThatWereSetTurnoffListener = keysThatWereSetTurnoffListener.filter((k) => k !== key);
// }
// function __isMarkStopListen(key: string) {
//   return !!key && keysThatWereSetTurnoffListener.includes(key);
// }
// //--------------------------------------------
// function __pushEvent<ItemValue>(key: string, detail: LocalStorageListenableItemDictionary<ItemValue>) {
//   if (!key) return;
//   if (__isMarkStopListen(key)) return;
//   if (typeof window === 'undefined') return;
//   if (typeof window.document === 'undefined') return;
//   if (typeof window.document.dispatchEvent !== 'function') return;
//   let event = new CustomEvent(`${prefixEventName}${key}`, { detail });
//   document.dispatchEvent(event);
// }
// //--------------------------------------------
// function __setSyncItem<ValueType>(key: string, value: ValueType) {
//   if (!key) return;
//   const previousValue = localStorageGetItem<ValueType>(key);
//   localStorageUpdateItem(key, value);
//   if (!!previousValue) {
//     const i = itemDictionaries.findIndex((dict) => dict.name === key);
//     if (i !== -1) {
//       itemDictionaries[i].value = value;
//       itemDictionaries[i].previousValue = previousValue;
//       __pushEvent(itemDictionaries[i].name, itemDictionaries[i]);
//     }
//   } else itemDictionaries.push({ name: key, value });
// }
// function __getSyncItem<ValueType>(key: string) {
//   if (!key) return null;
//   const value = localStorageGetItem<ValueType>(key);
//   return value;
// }
// //--------------------------------------------
// export type LocalStorageSyncKey = {
//   name: string;
//   value: string;
//   previousValue?: string;
// };
// export type LocalStorageChangeItemEvent = CustomEvent<LocalStorageSyncKey>;
// export type LocalStorageChangeItemValue<T> = {
//   name: string;
//   value: T | null | undefined;
//   previousValue: T | null | undefined;
// };
// export type LocalStorageChangeItemHandler<DataType> = (
//   event: LocalStorageChangeItemEvent,
//   detail: LocalStorageChangeItemValue<DataType>
// ) => void;

// export type LocalStorageSyncItem<DataType> = {
//   key: string;
//   get: LocalStorageItemGetter<DataType>;
//   /**
//    * @example
//       auth.set(jwt)
//       // used for normal cases the change event will affect all tabs which subscribe to changes of `auth`
//    * @example
//       auth.set(jwt, true)
//       // the listener for `auth` in the current tab will be stopped till the next change happen.
//       // used in case the change event will affect other tabs not the current
//    */
//   set: LocalStorageSyncItemSetter<DataType>;
//   onChange: (handler: LocalStorageChangeItemHandler<DataType>) => void;
// };
// //---------------------------------------------------------------------------
// /**
//  * Array of items which used to compare with values in LS
//  */
// const initializedKeys: LocalStorageSyncKey[] = [];

// function __detectChangeAndSync() {
//   const changes: LocalStorageSyncKey[] = [];
//   const state = {} as { [x: string]: string };
//   if (
//     typeof window === 'undefined' ||
//     typeof window.localStorage === 'undefined' ||
//     typeof window.localStorage.getItem !== 'function'
//   )
//     return changes;
//   Object.keys(window.localStorage)
//     .filter((key) => key.startsWith(prefix))
//     .forEach((key) => {
//       state[key] = window.localStorage.getItem(key) || '';
//     });
//   for (let i = 0; i < initializedKeys.length; i++) {
//     const currentValue = __extractJsonValue<any>(initializedKeys[i].value);
//     const incomingValue = __extractJsonValue<any>(state[initializedKeys[i].name]);
//     if (isEqual(currentValue, incomingValue)) continue;
//     let change = {
//       name: initializedKeys[i].name,
//       value: state[initializedKeys[i].name],
//       previousValue: initializedKeys[i].value,
//     };
//     changes.push(change);
//     initializedKeys[i].value = change.value;
//     initializedKeys[i].previousValue = change.previousValue;
//   }
//   return changes;
// }
// function __triggerListeners(changes: LocalStorageSyncKey[] = []) {
//   if (
//     typeof document === 'undefined' ||
//     typeof document.dispatchEvent !== 'function' ||
//     !(Array.isArray(changes) && changes.length > 0)
//   )
//     return;
//   for (let i = 0; i < changes.length; i++) {
//     __pushEvent(changes[i].name, {
//       ...changes[i],
//       value: changes[i].value !== defaultSyncValue ? changes[i].value : undefined,
//       previousValue: changes[i].previousValue !== defaultSyncValue ? changes[i].previousValue : undefined,
//     } as LocalStorageSyncKey);
//   }
// }
// function __initListener() {
//   if (isInitialized || typeof window === 'undefined' || typeof window.addEventListener !== 'function') return;
//   window.addEventListener('storage', () => {
//     const changes = __detectChangeAndSync();
//     __triggerListeners(changes);
//   });
//   isInitialized = true;
// }
// function __extractJsonValue<T>(
//   value: string | null | undefined,
//   validate?: LocalStorageItemValidator<T>
// ): T | null {
//   if (!value) return null;
//   let returns = null;
//   try {
//     // Object
//     returns = JSON.parse(JSON.parse(value)) as T;
//     if (returns === defaultSyncValue) return null;
//   } catch (e1) {
//     // number | boolean
//     try {
//       returns = JSON.parse(value) as T;
//       if (returns === defaultSyncValue) return null;
//     } catch (e2) {
//       // plain text
//       returns = value as T;
//       if (returns === defaultSyncValue) return null;
//     }
//   } finally {
//     if (typeof validate === 'function') {
//       return validate(returns) === true ? returns : null;
//     }
//     return returns;
//   }
// }
// function __addLocalStorageListener(key: string, handler: (event: LocalStorageChangeItemEvent) => void) {
//   if (typeof document !== 'undefined') {
//     document.addEventListener(`${prefixEventName}${key}`, handler as any);
//   }
// }
// export function newLocalStorageListenableItem<T>(args: {
//   key: string;
//   defaultValue?: T;
//   validate?: LocalStorageItemValidator<T>;
//   migrate?: LocalStorageItemMigrate<T>;
//   overrideValueIfInvalid?: boolean;
// }): LocalStorageSyncItem<T> {
//   const syncKey = `${prefix}${args.key}`;
//   const previousValue = localStorageGetItem<string>(syncKey);
//   if (previousValue) {
//     initializedKeys.push({
//       name: syncKey,
//       value: previousValue,
//       previousValue: undefined,
//     });
//   } else {
//     localStorageUpdateItem(syncKey, defaultSyncValue);
//     initializedKeys.push({
//       name: syncKey,
//       value: !!args?.defaultValue ? JSON.stringify(args.defaultValue) : defaultSyncValue,
//       previousValue: undefined,
//     });
//   }
//   __initListener();
//   return {
//     key: syncKey,
//     get: () => {
//       const value = __getSyncItem(syncKey);
//       if (!value || value === defaultSyncValue) return null;
//       return __extractJsonValue<T>(value, args?.validate);
//     },
//     set: (value: T | null | undefined, stopListenerInThisTab?: boolean) => {
//       if (stopListenerInThisTab) __markStopListen(syncKey);
//       __setSyncItem(syncKey, JSON.stringify(value || defaultSyncValue));
//     },
//     onChange: (
//       handler: (event: LocalStorageChangeItemEvent, value: LocalStorageChangeItemValue<T>) => void
//     ) => {
//       if (__isMarkStopListen(syncKey)) {
//         __unmarkStopListen(syncKey);
//         return;
//       }
//       if (!handler) return;
//       __addLocalStorageListener(syncKey, (event: LocalStorageChangeItemEvent) => {
//         const { detail } = event;
//         const value: LocalStorageChangeItemValue<T> = {
//           name: detail.name,
//           value: __extractJsonValue(detail.value, args?.validate),
//           previousValue: __extractJsonValue(detail.previousValue, args?.validate),
//         };
//         handler(event, value);
//       });
//     },
//   };
// }
// export function resetAllSyncKeys() {
//   if (!(Array.isArray(initializedKeys) && initializedKeys.length > 0)) return;
//   for (let i = 0; i < initializedKeys.length; i++) {
//     if (typeof initializedKeys[i].name !== 'string') continue;
//     initializedKeys[i].value = defaultSyncValue;
//     initializedKeys[i].previousValue = undefined;
//     localStorageUpdateItem(initializedKeys[i].name, defaultSyncValue);
//   }
// }
export const name = 'helper2';
