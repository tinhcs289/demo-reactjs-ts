import { ReactNode, createContext, useCallback, useContext, useRef, useSyncExternalStore } from 'react';
/**
 * @example
    const { Provider, useStore } = createFastContext<IThemeConfig>(getConfigFromLocalStorage())
    //
    <Provider>
      <App />
    </Provider>
    //
    const App = () => {
        const [backgroundColor, setBackGroundColor] = useStore((store) => store.backgroundColor);
        return (
            <div style={{ backgroundColor }}>
                <input
                    onChange={(e) => setBackGroundColor({ backgroundColor: 'red' })}
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
  function useStoreGetter<SelectorOutput>(selector: (store: StoreValues) => SelectorOutput): SelectorOutput {
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
  function useStoreSetter() {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error('Store not found');
    }
    return store.set;
  }
  return { Provider, useStore, useStoreGetter, useStoreSetter };
}
