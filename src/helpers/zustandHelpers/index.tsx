import type { ReactNode } from 'react';
import { createContext, useContext, useRef } from 'react';
import type { StateCreator, StoreApi } from 'zustand';
import { createStore, useStore } from 'zustand';
/**
 * @example
    const { ZustandStoreProvider, useZustandSelector, useZustandStore } = createZustandContext<{
      someValue: string;
      setSomeValue: (value: string) => void;
    }>((set) => ({
      someValue: 'some_value',
      setSomeValue: (value) => set((state) => ({ ...state, someValue: value })),
    }));

    function StateInit(props: Partial<SomeValueStore>) {
      const { someValue } = props;
      const store = useZustandStore();
      store.setState((state) => ({ ...state, someValue: someValue }));
      return <></>;
    }
    
    function MyComponent1() {
      const someValue = useZustandSelector((s) => s?.someValue);
      return <div>{someValue}</div>;
    }

    function MyComponent2() {
      const setSomeValue = useZustandSelector((s) => s?.setSomeValue);
      return (
        <button
          onClick={() => {
            setSomeValue('new_value');
          }}
        >
          set value
        </button>
      );
    }

    function MyRootComponent() {
      return (
        <ZustandStoreProvider>
          <StateInit someValue={'defaut_value_from_somewhere'} />
          <MyComponent1 />
          <MyComponent2 />
        </ZustandStoreProvider>
      );
    }
 */
export default function createZustandContext<State>(initializer: StateCreator<State, [], [], State>) {
  const StoreContext = createContext<StoreApi<State>>(null as any);
  function ZustandStoreProvider(props: { children: ReactNode }) {
    const { children } = props;
    const storeRef = useRef<StoreApi<State>>();
    if (!storeRef.current) {
      storeRef.current = createStore<State>(initializer);
    }
    return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>;
  }
  function useZustandSelector<SelectorOutput>(selector: (state: State) => SelectorOutput) {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error('Missing StoreProvider');
    }
    return useStore(store, selector);
  }
  function useZustandStore(): StoreApi<State> {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error('Missing StoreProvider');
    }
    return store;
  }
  return {
    ZustandStoreProvider,
    useZustandStore,
    useZustandSelector,
  };
}
export type ZustandStore<State> = StoreApi<State>;
export type UseZustandStore<State, SelectorOutput> = (
  selector: (state: State) => SelectorOutput
) => SelectorOutput;
