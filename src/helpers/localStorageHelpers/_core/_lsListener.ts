import localStorageUpdateItem from './localStorageUpdateItem';
import localStorageGetItem from './localStorageGetItem';
import isEqual from 'lodash/isEqual';
import type { TLsSyncKey, TLsChangeEvent, TLsSyncItem, TLsChangeEventValue } from '../_types';

let isInitialized = false;
const prefix = 'lsSync:';
const prefixEventName = 'ls:changes';
const defaultSyncValue = 'lsSync:default';

/**
 * Array of items which used to compare with values in LS
 */
const initializedKeys: TLsSyncKey[] = [];

/**
 * Array of item keys which is marked as stop event-listener in current tab
 */
let stopList: string[] = [];

const __markStopListen = (key: string) => {
  if (!key || stopList.includes(key)) return;
  stopList.push(key);
};

const __unmarkStopListen = (key: string) => {
  if (!key || !stopList.includes(key)) return;
  stopList = stopList.filter((k) => k !== key);
};

const __isMarkStopListen = (key: string) => {
  return !!key && stopList.includes(key);
};

const __setSyncItem = (key: string, value: string) => {
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

const __getSyncItem = (key: string) => {
  if (!key) return null;

  const value = localStorageGetItem<string>(key);
  if (!value) return null;
  try {
    if (JSON.parse(value) === defaultSyncValue) return null;
  } catch (error) { }
  return value;
};

const __detectChangeAndSync = () => {
  const changes: TLsSyncKey[] = [];
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
    if (!isEqual(currentValue, incomingValue)) {
      let change = {
        name: initializedKeys[i].name,
        value: state[initializedKeys[i].name],
        previousValue: initializedKeys[i].value,
      };
      changes.push(change);
      initializedKeys[i].value = change.value;
      initializedKeys[i].previousValue = change.previousValue;
    }
  }

  return changes;
};

const __pushEvent = (key: string, detail: TLsSyncKey) => {
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

const __triggerListeners = (changes: TLsSyncKey[] = []) => {
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
    } as TLsSyncKey);
  }
};

const __initListener = () => {
  if (isInitialized || typeof window === 'undefined' || typeof window.addEventListener !== 'function') return;

  window.addEventListener('storage', () => {
    const changes = __detectChangeAndSync();
    __triggerListeners(changes);
  });
  isInitialized = true;
};

const __extractJsonValue = <T>(value: string | null | undefined, validate?: (value: T | null) => boolean): T | null => {
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
      return validate(returns) === true ? returns : null
    }

    return returns;
  }
};

const __addLocalStorageListener = (key: string, handler: (event: TLsChangeEvent) => void) => {
  if (typeof document !== 'undefined') {
    document.addEventListener(`${prefixEventName}${key}`, handler as any);
  }
};

export const newLocalStorageListenableItem = <T>(args: { key: string; defaultValue?: T, validate?: (value: T | null) => boolean }): TLsSyncItem<T> => {
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
    onChange: (handler: (event: TLsChangeEvent, value: TLsChangeEventValue<T>) => void) => {
      if (__isMarkStopListen(syncKey)) {
        __unmarkStopListen(syncKey);
        return;
      }

      if (!handler) return;

      __addLocalStorageListener(syncKey, (event: TLsChangeEvent) => {
        const { detail } = event;
        const value: TLsChangeEventValue<T> = {
          name: detail.name,
          value: __extractJsonValue(detail.value, args?.validate),
          previousValue: __extractJsonValue(detail.previousValue, args?.validate),
        };

        handler(event, value);
      });
    },
  };
};

export const resetAllSyncKeys = () => {
  if (!(Array.isArray(initializedKeys) && initializedKeys.length > 0)) return;

  for (let i = 0; i < initializedKeys.length; i++) {
    if (typeof initializedKeys[i].name === 'string') {
      initializedKeys[i].value = defaultSyncValue;
      initializedKeys[i].previousValue = undefined;
      localStorageUpdateItem(initializedKeys[i].name, defaultSyncValue);
    }
  }
};
