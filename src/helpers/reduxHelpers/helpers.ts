import { reduxBatch } from '@manaflair/redux-batch';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import get from 'lodash/get';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import type { ForkEffectDescriptor, SimpleEffect } from 'redux-saga/effects';
import { all, fork } from 'redux-saga/effects';
import type { ReduxCase, ReduxStore, TAction, TInitState, TObject, TReducer, TReducerRoot, TSaga } from './_types';

function createRootReducer(name: string, reducers: TReducerRoot[]) {
  let combine = {} as { [x: string]: any };
  reducers.forEach((c) => { combine[c.name] = c.reducer });
  const rootReducer = combineReducers(combine);
  function* rootSaga() {
    yield all(reducers.filter((r) => !!r.sagas).map((r) => fork(r.sagas as any)));
  }
  return {
    name: `${name}`,
    reducer: rootReducer,
    sagas: rootSaga,
  };
};

export function createReduxStore(reducers: {
  name: string;
  reducer: (state: TInitState, action: TAction) => TObject;
  sagas?: TSaga;
}[], shouldEnabledDevTools: boolean = false) {

  const devTools = !!shouldEnabledDevTools;
  const enhancers = [reduxBatch];
  const { reducer, sagas } = createRootReducer('', reducers);
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [
    ...getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      thunk: true,
    }),
    sagaMiddleware,
  ];
  const store = configureStore({ reducer, middleware, devTools, enhancers, });
  sagaMiddleware.run(sagas);
  return store;
};


function createAction<T extends { [x: string]: any }>(type: string) {
  return function action(payload: T) {
    return { type, payload };
  };
}

export function createCase<ActionPayload extends TObject, State>(
  actionType: string,
  caseHandle: ReduxCase<ActionPayload, State>,
  sagaEffect?: SimpleEffect<"FORK", ForkEffectDescriptor<never>>,
) {
  return {
    type: actionType,
    action: createAction<ActionPayload>(actionType),
    combine: { [actionType]: caseHandle },
    effect: sagaEffect,
  }
};
type Case = ReturnType<typeof createCase<any, any>>;
function createReducerCaseDict(...cases: Case[]) {
  const dict: { [x: string]: ReduxCase<any, any> } = cases.reduce(function (dict, reduxCases, allCases) {
    return { ...dict, ...reduxCases.combine };
  }, {});
  return dict;
}
function createRootSaga(...cases: Case[]) {
  const effects = cases?.filter(c => !!c?.effect).map(c => c.effect);
  if (effects.length === 0) return undefined;
  return function* sagas() {
    yield all(effects)
  }
}
export function createReducer(rootName: string, state: TInitState, ...cases: Case[]) {
  function creator(
    name: string,
    initState: TInitState,
    reducerCaseDict: { [x: string]: TReducer },
    sagas?: TSaga
  ) {
    return {
      name,
      reducer: (state: TInitState, action: TAction) => {
        if (typeof state === 'undefined') return initState;
        return typeof reducerCaseDict[action.type] === 'function' ? reducerCaseDict[action.type](action, state) : state;
      },
      sagas,
    };
  };
  const caseDict = createReducerCaseDict(...cases);
  const sagas = createRootSaga(...cases);
  return creator(rootName, state, caseDict, sagas as any);
}
export function createRootSelector<State extends { [x: string]: any }>(rootName: string) {
  return function selector(state: ReduxStore) {
    return get(state, rootName) as State | undefined;
  }
};