import localStorageUpdateItem from './localStorageUpdateItem';
import localStorageGetItem from './localStorageGetItem';
import isEqual from 'lodash/isEqual';
import type { TLsSyncKey, TLsChangeEvent } from './_types';

const prefix = 'lsSync:';
const prefixEventName = 'ls:changes';
const defaultSyncValue = 'default';
const initializedKeys: TLsSyncKey[] = [];
let isInitialized = false;

const __setSyncItem = (key: string, value: string) => {
  if (!key) return;

  const previousValue = localStorageGetItem<string>(key);
  localStorageUpdateItem(key, value);
  if (previousValue) {
    const i = initializedKeys.findIndex((syncKey) => syncKey.name === key);
    if (i !== -1) {
      initializedKeys[i].value = value;
      initializedKeys[i].previousValue = previousValue;
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
  if (value === defaultSyncValue) return undefined;
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
    if (!isEqual(initializedKeys[i].value, state[initializedKeys[i].name])) {
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

const __triggerListeners = (changes: TLsSyncKey[] = []) => {
  if (
    typeof document === 'undefined' ||
    typeof document.dispatchEvent !== 'function' ||
    !(Array.isArray(changes) && changes.length > 0)
  )
    return;

  for (let i = 0; i < changes.length; i++) {
    let event = new CustomEvent(`${prefixEventName}${changes[i].name}`, {
      detail: {
        ...changes[i],
        value: changes[i].value !== defaultSyncValue ? changes[i].value : undefined,
        previousValue: changes[i].previousValue !== defaultSyncValue ? changes[i].previousValue : undefined,
      } as TLsSyncKey,
    });
    document.dispatchEvent(event);
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

export const newLocalStorageListenableItem = (key: string) => {
  const syncKey = `${prefix}${key}`;
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
      value: defaultSyncValue,
      previousValue: undefined,
    });
  }
  __initListener();
  return {
    name: syncKey,
    get: () => __getSyncItem(syncKey),
    set: (value: string) => __setSyncItem(syncKey, value),
  };
};

export const addLocalStorageListener = (key: string, handler: (event: TLsChangeEvent) => void) => {
  if (typeof document !== 'undefined') {
    document.addEventListener(`${prefixEventName}${key}`, handler as any);
  }
};

export const extractEventData = (event: TLsChangeEvent) => {
  const detail = event?.detail;
  if (!detail?.value) return undefined;
  return detail.value;
};

export const extractJsonEventData = <T>(event: TLsChangeEvent): T | null => {
  if (!event?.detail || !event?.detail?.value) return null;
  try {
    const eventData = JSON.parse(event.detail.value) as T;
    return eventData;
  } catch (error) {
    console.log(error);
    return null;
  }
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

export const localStorageResetSyncKey = (key: string) => {
  __setSyncItem(key, defaultSyncValue);
};
