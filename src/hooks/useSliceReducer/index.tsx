import { useReducer } from 'react';
import { createSlice, CreateSliceOptions, SliceCaseReducers } from '@reduxjs/toolkit';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

/**
 * A custom `useReducer`'s usage which is very similar to `Redux Toolkit`'s `createSlice` 
 * @example
    import type { PayloadAction } from '@reduxjs/toolkit';
    //
    const [state, { increment, incrementBy }] = useSliceReducer({
    initialState: { count: 0 },
    reducers: {
      increment: (state) => {
        state.count += 1;
      },
      incrementBy: (state, action: PayloadAction<number>) => {
        state.count += action.payload;
      },
    },
    });
    //
    incrementBy(3)
 */
const useSliceReducer = <State, CaseReducers extends SliceCaseReducers<State>, Name extends string = string>(
  options: Optional<CreateSliceOptions<State, CaseReducers, Name>, 'name'>
) => {
  const slice = createSlice({ name: '__name', ...options });
  const [state, dispatch] = useReducer(slice.reducer as any, options.initialState);
  Object.entries(slice.actions).forEach(([name, action]) => {
    // @ts-ignore
    slice.actions[name] = (...args) => {
      // @ts-ignore
      dispatch(action(...args));
    };
  });
  return [state, slice.actions, dispatch] as const;
};
export default useSliceReducer;
