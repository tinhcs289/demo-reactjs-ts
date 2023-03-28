import isEqual from 'lodash/isEqual';
export type LocalStorageItemGetter<T> = () => T | null | undefined;
export type LocalStorageItemSetter<T> = (value: T | null | undefined) => void;
export type LocalStorageSyncItemSetter<T> = (value: T | null | undefined, stopListenerInThisTab?: boolean) => void;
export type LocalStorageItemValidator<T> = (value: T | null) => boolean;
export type LocalStorageItemMigrate<T> = (value: string) => T | null;
export type LocalStorageItem<T> = {
  key: string;
  get: LocalStorageItemGetter<T>;
  set: LocalStorageItemSetter<T>;
  clear: () => void;
};
function localStorageRemoveItem(key: string) {
  if (
    !key ||
    typeof Storage === 'undefined' ||
    typeof window === 'undefined' ||
    typeof window.localStorage === 'undefined' ||
    typeof window.localStorage.removeItem !== 'function'
  ) {
    return;
  }
  return window.localStorage.removeItem(key);
};
function localStorageUpdateItem<T>(key: string, value: T) {
  if (
    !key ||
    typeof Storage === 'undefined' ||
    typeof window === 'undefined' ||
    typeof window.localStorage === 'undefined' ||
    typeof window.localStorage.setItem !== 'function'
  ) {
    return;
  }
  return window.localStorage.setItem(key, JSON.stringify(value));
};
function localStorageGetItem<T>(
  key: string,
  validate?: LocalStorageItemValidator<T>,
  migrate?: LocalStorageItemMigrate<T>,
): T | null {
  if (
    !key ||
    typeof Storage === 'undefined' ||
    typeof window === 'undefined' ||
    typeof window.localStorage === 'undefined' ||
    typeof window.localStorage.getItem !== 'function'
  ) {
    return null;
  }
  const value = window.localStorage.getItem(key);
  if (!value) return null;
  let returns = null;
  try {
    const val = JSON.parse(value) as T;
    if (typeof validate === 'function') {
      if (validate(val) === true)
        returns = val;
      else {
        if (typeof migrate !== 'function')
          returns = null
        else
          returns = migrate(value || '');
      }
    } else returns = val;
  } catch (error) {
    returns = value as T;
  } finally {
    return returns;
  }
};
export type CreateNewLocalStorageItemArgs<T> = Partial<Omit<LocalStorageItem<T>, 'key'>> & {
  key: string;
  validate?: LocalStorageItemValidator<T>,
  migrate?: LocalStorageItemMigrate<T>,
}
export function newLocalStorageItem<T>(args: CreateNewLocalStorageItemArgs<T>) {
  return {
    key: args.key,
    get: args?.get || (() => localStorageGetItem(args.key, args?.validate, args?.migrate)),
    set: args?.set || ((value: T | null | undefined) => localStorageUpdateItem(args.key, value)),
    clear: args?.clear || (() => localStorageRemoveItem(args.key)),
  } as LocalStorageItem<T>;
};
export type LocalStorageSyncKey = {
  value: string;
  name: string;
  previousValue?: string;
};
export type LocalStorageChangeItemEvent = CustomEvent<LocalStorageSyncKey>;
export type LocalStorageChangeItemValue<T> = {
  name: string;
  value: T | null | undefined;
  previousValue: T | null | undefined;
};
export type LocalStorageChangeItemHandler<DataType> = (
  event: LocalStorageChangeItemEvent,
  detail: LocalStorageChangeItemValue<DataType>
) => void;
export type LocalStorageSyncItem<DataType> = {
  key: string;
  get: LocalStorageItemGetter<DataType>;
  /**
   * @example 
      auth.set(jwt)
      // used for normal cases the change event will affect all tabs which subscribe to changes of `auth`
   * @example 
      auth.set(jwt, true) 
      // the listener for `auth` in the current tab will be stopped till the next change happen.
      // used in case the change event will affect other tabs not the current
   */
  set: LocalStorageSyncItemSetter<DataType>;
  onChange: (handler: LocalStorageChangeItemHandler<DataType>) => void;
};
//---------------------------------------------------------------------------
let isInitialized = false;
const prefix = 'lsSync:';
const prefixEventName = 'ls:changes';
const defaultSyncValue = 'lsSync:default';
/**
 * Array of items which used to compare with values in LS
 */
const initializedKeys: LocalStorageSyncKey[] = [];
/**
 * Array of item keys which is marked as stop event-listener in current tab
 */
let stopList: string[] = [];
function __markStopListen(key: string) {
  if (!key || stopList.includes(key)) return;
  stopList.push(key);
};
function __unmarkStopListen(key: string) {
  if (!key || !stopList.includes(key)) return;
  stopList = stopList.filter((k) => k !== key);
};
function __isMarkStopListen(key: string) {
  return !!key && stopList.includes(key);
};
function __setSyncItem(key: string, value: string) {
  if (!key) return;
  const previousValue = localStorageGetItem<string>(key);
  localStorageUpdateItem(key, value);
  if (previousValue) {
    const i = initializedKeys.findIndex((syncKey) => syncKey.name === key);
    if (i !== -1) {
      initializedKeys[i].value = value;
      initializedKeys[i].previousValue = previousValue;

      if (__isMarkStopListen(key)) return;
      __pushEvent(initializedKeys[i].name, initializedKeys[i]);
    }
  } else {
    initializedKeys.push({
      name: key,
      value: value,
      previousValue: undefined,
    });
  }
};
function __getSyncItem(key: string) {
  if (!key) return null;
  const value = localStorageGetItem<string>(key);
  if (!value) return null;
  try {
    if (JSON.parse(value) === defaultSyncValue) return null;
  } catch (error) { }
  return value;
};
function __detectChangeAndSync() {
  const changes: LocalStorageSyncKey[] = [];
  const state = {} as { [x: string]: string };
  if (
    typeof window === 'undefined' ||
    typeof window.localStorage === 'undefined' ||
    typeof window.localStorage.getItem !== 'function'
  )
    return changes;
  Object.keys(window.localStorage)
    .filter((key) => key.startsWith(prefix))
    .forEach((key) => {
      state[key] = window.localStorage.getItem(key) || '';
    });
  for (let i = 0; i < initializedKeys.length; i++) {
    const currentValue = __extractJsonValue<any>(initializedKeys[i].value);
    const incomingValue = __extractJsonValue<any>(state[initializedKeys[i].name]);
    if (isEqual(currentValue, incomingValue)) continue;
    let change = {
      name: initializedKeys[i].name,
      value: state[initializedKeys[i].name],
      previousValue: initializedKeys[i].value,
    };
    changes.push(change);
    initializedKeys[i].value = change.value;
    initializedKeys[i].previousValue = change.previousValue;
  }
  return changes;
};
function __pushEvent(key: string, detail: LocalStorageSyncKey) {
  if (
    typeof window === 'undefined' ||
    typeof window.document === 'undefined' ||
    typeof window.document.dispatchEvent !== 'function'
  ) {
    return;
  }
  let event = new CustomEvent(`${prefixEventName}${key}`, { detail });
  document.dispatchEvent(event);
};
function __triggerListeners(changes: LocalStorageSyncKey[] = []) {
  if (
    typeof document === 'undefined' ||
    typeof document.dispatchEvent !== 'function' ||
    !(Array.isArray(changes) && changes.length > 0)
  )
    return;
  for (let i = 0; i < changes.length; i++) {
    __pushEvent(changes[i].name, {
      ...changes[i],
      value: changes[i].value !== defaultSyncValue ? changes[i].value : undefined,
      previousValue: changes[i].previousValue !== defaultSyncValue ? changes[i].previousValue : undefined,
    } as LocalStorageSyncKey);
  }
};
function __initListener() {
  if (isInitialized || typeof window === 'undefined' || typeof window.addEventListener !== 'function') return;
  window.addEventListener('storage', () => {
    const changes = __detectChangeAndSync();
    __triggerListeners(changes);
  });
  isInitialized = true;
};
function __extractJsonValue<T>(
  value: string | null | undefined,
  validate?: LocalStorageItemValidator<T>
): T | null {
  if (!value) return null;
  let returns = null;
  try {
    // Object
    returns = JSON.parse(JSON.parse(value)) as T;
    if (returns === defaultSyncValue) return null;
  } catch (e1) {
    // number | boolean
    try {
      returns = JSON.parse(value) as T;
      if (returns === defaultSyncValue) return null;
    } catch (e2) {
      // plain text
      returns = value as T;
      if (returns === defaultSyncValue) return null;
    }
  } finally {
    if (typeof validate === 'function') {
      return validate(returns) === true ? returns : null;
    }
    return returns;
  }
};
function __addLocalStorageListener(
  key: string,
  handler: (event: LocalStorageChangeItemEvent) => void,
) {
  if (typeof document !== 'undefined') {
    document.addEventListener(`${prefixEventName}${key}`, handler as any);
  }
};
export function newLocalStorageListenableItem<T>(args: {
  key: string;
  defaultValue?: T;
  validate?: LocalStorageItemValidator<T>;
}): LocalStorageSyncItem<T> {
  const syncKey = `${prefix}${args.key}`;
  const previousValue = localStorageGetItem<string>(syncKey);
  if (previousValue) {
    initializedKeys.push({
      name: syncKey,
      value: previousValue,
      previousValue: undefined,
    });
  } else {
    localStorageUpdateItem(syncKey, defaultSyncValue);
    initializedKeys.push({
      name: syncKey,
      value: !!args?.defaultValue ? JSON.stringify(args.defaultValue) : defaultSyncValue,
      previousValue: undefined,
    });
  }
  __initListener();
  return {
    key: syncKey,
    get: () => {
      const value = __getSyncItem(syncKey);
      if (!value || value === defaultSyncValue) return null;
      return __extractJsonValue<T>(value, args?.validate);
    },
    set: (value: T | null | undefined, stopListenerInThisTab?: boolean) => {
      if (stopListenerInThisTab) __markStopListen(syncKey);
      __setSyncItem(syncKey, JSON.stringify(value || defaultSyncValue));
    },
    onChange: (handler: (event: LocalStorageChangeItemEvent, value: LocalStorageChangeItemValue<T>) => void) => {
      if (__isMarkStopListen(syncKey)) {
        __unmarkStopListen(syncKey);
        return;
      }
      if (!handler) return;
      __addLocalStorageListener(syncKey, (event: LocalStorageChangeItemEvent) => {
        const { detail } = event;
        const value: LocalStorageChangeItemValue<T> = {
          name: detail.name,
          value: __extractJsonValue(detail.value, args?.validate),
          previousValue: __extractJsonValue(detail.previousValue, args?.validate),
        };
        handler(event, value);
      });
    },
  };
}
export function resetAllSyncKeys() {
  if (!(Array.isArray(initializedKeys) && initializedKeys.length > 0)) return;
  for (let i = 0; i < initializedKeys.length; i++) {
    if (typeof initializedKeys[i].name !== 'string')
      continue;
    initializedKeys[i].value = defaultSyncValue;
    initializedKeys[i].previousValue = undefined;
    localStorageUpdateItem(initializedKeys[i].name, defaultSyncValue);
  }
};
