import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useRef, useSyncExternalStore } from 'react';

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
                    onChange={(e) => setStore({ backgroundColor: 'red' })}
                />
            </div>
        );
    };
 */
export default function createFastContext<Store>(initialState: Store) {
  /**
   * @note there is a hook in `@/hooks` do the same thing, `usePubSubDataStore`
   */
  function useStoreData(): {
    get: () => Store;
    set: (value: Partial<Store>) => void;
    subscribe: (callback: () => void) => () => void;
  } {
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

  type UseStoreDataReturnType = ReturnType<typeof useStoreData>;

  const StoreContext = createContext<UseStoreDataReturnType | null>(null);

  function Provider({ children }: { children: ReactNode }) {
    return <StoreContext.Provider value={useStoreData()}>{children}</StoreContext.Provider>;
  }

  function useStore<SelectorOutput>(
    selector: (store: Store) => SelectorOutput,
  ): [SelectorOutput, (value: Partial<Store>) => void] {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error('Store not found');
    }

    // this is exactly what `useSyncExternalStore` do.
    // =>
    // const [state, setState] = useState(store.get());
    // useEffect(() => {
    //  return store.subscribe(() => setState(store.get()));
    // }, []);

    const state = useSyncExternalStore(
      store.subscribe,
      () => selector(store.get()),
      () => selector(initialState),
    );

    return [state, store.set];
  }

  return {
    Provider,
    useStore,
  };
}
