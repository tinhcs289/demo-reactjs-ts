import { TAction, TInitState, TReducer, TSaga } from './types';

const createReducer = (name: string, initState: TInitState, dispatch: { [x: string]: TReducer }, sagas?: TSaga) => {
  return {
    name,
    reducer: (state: TInitState, action: TAction) => {
      if (typeof state === 'undefined') return initState;
      return typeof dispatch[action.type] === 'function' ? dispatch[action.type](action, state) : state;
    },
    sagas,
  };
};
export default createReducer;
