import { all, fork } from 'redux-saga/effects';
import { TInitState, TReducer, TReducerRootCombined, TSaga, TAction } from './_types';

const createNestedReducer = (
  name: string,
  initialState: TInitState,
  dispatch: { [x: string]: TReducer },
  sagas?: TSaga,
  otherCombines?: TReducerRootCombined[],
) => {
  const combineSagas = otherCombines?.filter?.((c) => c.sagas).map((r) => r.sagas) || [];
  if (!!sagas) combineSagas.push(sagas as any);

  return {
    name: name,
    reducer: (state: TInitState, action: TAction) => {
      let combineState = {};

      if (typeof state === 'undefined') combineState = { ...initialState };

      if (typeof dispatch[action.type] === 'function') {
        combineState = dispatch[action.type](action, state);
      } else {
        combineState = { ...initialState, ...state };
      }

      otherCombines?.forEach?.((c) => {
        combineState = {
          ...combineState,
          [c.name]: c.reducer((state || { [c.name]: undefined })[c.name], action),
        };
      });

      return combineState;
    },
    sagas: function* rootSagas() {
      yield all(combineSagas.map((sagas) => fork(sagas)));
    },
  };
};
export default createNestedReducer;
