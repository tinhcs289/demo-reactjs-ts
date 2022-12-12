import { useCallback, useRef } from 'react';

export type UsePubSubDataStoreReturn<Store> = {
  get: () => Store;
  set: (value: Partial<Store>) => void;
  subscribe: (callback: () => void) => () => void;
};

function usePubSubDataStore<Store> (initialState: Store): UsePubSubDataStoreReturn<Store> {
  const store = useRef(initialState);

  const get = useCallback(() => store.current, []);

  const subscribers = useRef(new Set<() => void>());

  const set = useCallback((value: Partial<Store>) => {
    store.current = { ...store.current, ...value };
    subscribers.current.forEach((callback) => callback());
  }, []);

  const subscribe = useCallback((callback: () => void) => {
    subscribers.current.add(callback);
    return () => subscribers.current.delete(callback);
  }, []);

  return {
    get,
    set,
    subscribe,
  };
}
export default usePubSubDataStore;
