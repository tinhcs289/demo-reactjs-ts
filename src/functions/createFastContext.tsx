import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import type { ReactNode } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
/**
 * @example
    const { Provider, useGetter, useSetter } = createFastContext<IThemeConfig>(someData)
    //
    <Provider>
      <App />
    </Provider>
    //
    const App = () => {
        const backgroundColor = useGetter((store) => store.backgroundColor);
        const setState = useSetter();
        return (
            <div style={{ backgroundColor }}>
                <input
                    onChange={(e) => setState({ backgroundColor: 'red' })}
                />
            </div>
        );
    };
 */
export default function createFastContext<StoreValues extends { [x: string]: any }>(
  initialState: StoreValues
) {
  function useStoreData(): {
    get: () => StoreValues;
    set: (value: Partial<StoreValues>) => void;
    subscribe: (callback: () => void) => () => void;
  } {
    const store = useRef(initialState);
    const get = useCallback(() => store.current, []);
    const subscribers = useRef(new Set<() => void>());
    const set = useCallback((value: Partial<StoreValues>) => {
      store.current = { ...store.current, ...value };
      subscribers.current.forEach((callback) => callback());
    }, []);
    const subscribe = useCallback((callback: () => void) => {
      subscribers.current.add(callback);
      return () => subscribers.current.delete(callback);
    }, []);
    return { get, set, subscribe };
  }
  type UseStoreDataReturnType = ReturnType<typeof useStoreData>;
  const StoreContext = createContext<UseStoreDataReturnType | null>(null);
  function Provider({ children }: { children: ReactNode }) {
    return <StoreContext.Provider value={useStoreData()}>{children}</StoreContext.Provider>;
  }
  function useStore<SelectorOutput>(
    selector: (store: StoreValues) => SelectorOutput
  ): [SelectorOutput, (value: Partial<StoreValues>) => void] {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error('Store not found');
    }
    const state = useSyncExternalStore(
      store.subscribe,
      () => selector(store.get()),
      () => selector(initialState)
    );
    return [state, store.set];
  }
  function useGetter<SelectorOutput>(selector: (store: StoreValues) => SelectorOutput): SelectorOutput {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error('Store not found');
    }
    const state = useSyncExternalStore(
      store.subscribe,
      () => selector(store.get()),
      () => selector(initialState)
    );
    return state;
  }
  function useSetter(): (value: Partial<StoreValues>) => void {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error('Store not found');
    }
    return store.set;
  }
  function useDefaultPropInit(
    field: string,
    value?: number | string | boolean | Array<any> | { [x: string]: any },
    forceUpdate: boolean = false
  ) {
    const setState = useSetter();
    const state = useGetter((s) => get(s, field));
    const [init, setInit] = useState(false);
    useEffect(() => {
      if (init) return;
      if ((typeof value === 'undefined' || value === null || value === '') && !forceUpdate) {
        return;
      }
      if (value instanceof Array || typeof value === 'object') {
        if (isEqual(value, state)) return;
        setInit(true);
        setState({ [field]: value } as any);
      } else {
        if (value === state) return;
        setInit(true);
        setState({ [field]: value } as any);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
  }
  return {
    Provider,
    useStore,
    useGetter,
    useSetter,
    useDefaultPropInit,
  };
}
