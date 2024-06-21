import { reduxBatch } from '@manaflair/redux-batch';
import { configureStore } from '@reduxjs/toolkit';
import get from 'lodash/get';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import type { ForkEffectDescriptor, SimpleEffect } from 'redux-saga/effects';
import { all, fork } from 'redux-saga/effects';
import type {
  InitState,
  ReduxCase,
  ReduxStore,
  TAction,
  TObject,
  TReducer,
  TReducerRoot,
  TReducerRootCombined,
  TSaga,
} from './_types';
const registeredActionTypes: string[] = [];
type SagaEffect = TSaga;
type ReduxAction = TAction;
type ReduxReducer = TReducer;
type ReducerRoot = TReducerRoot;
type CombinedRootReducer = TReducerRootCombined;
function createRootReducer(name: string, reducers: ReducerRoot[]) {
  let combine = {} as { [x: string]: any };
  reducers.forEach((c) => {
    combine[c.name] = c.reducer;
  });
  const rootReducer = combineReducers(combine);
  function* rootSaga() {
    yield all(reducers.filter((r) => !!r.sagas).map((r) => fork(r.sagas as any)));
  }
  return {
    name: `${name}`,
    reducer: rootReducer,
    sagas: rootSaga,
  };
}
export function createReduxStore(
  reducers: {
    name: string;
    reducer: (state: InitState, action: ReduxAction) => TObject;
    sagas?: SagaEffect;
  }[],
  shouldEnabledDevTools: boolean = false
) {
  const devTools = !!shouldEnabledDevTools;
  const { reducer, sagas } = createRootReducer('', reducers);
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer,
    //@ts-ignore
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
        thunk: true,
      }),
      sagaMiddleware,
    ],
    devTools,
    enhancers: (getDefaultEnhancers) => [...getDefaultEnhancers(), reduxBatch] as any,
  });
  sagaMiddleware.run(sagas);
  console.log('Redux store was created');
  return store;
}
function createAction<T extends { [x: string]: any }>(type: string) {
  return function action(payload: T) {
    return { type, payload };
  };
}
export function createCase<ActionPayload extends TObject, State>(
  actionType: string,
  caseHandle: ReduxCase<ActionPayload, State>,
  sagaEffect?: SimpleEffect<'FORK', ForkEffectDescriptor<never>>
) {
  //#region duplicated type warning
  if (registeredActionTypes.includes(actionType)) {
    console.warn(`the action type of ${actionType} was duplicated`);
  } else {
    registeredActionTypes.push(actionType);
  }
  //#endregion
  return {
    type: actionType,
    action: createAction<ActionPayload>(actionType),
    combine: { [actionType]: caseHandle },
    effect: sagaEffect,
  };
}
type Case = ReturnType<typeof createCase<any, any>>;
function createReducerCaseDict(...cases: Case[]) {
  const dict: { [x: string]: ReduxCase<any, any> } = cases.reduce(function (dict, reduxCases, allCases) {
    return { ...dict, ...reduxCases.combine };
  }, {});
  return dict;
}
function createRootSaga(...cases: Case[]) {
  const effects = cases?.filter((c) => !!c?.effect).map((c) => c.effect);
  if (effects.length === 0) return undefined;
  return function* sagas() {
    yield all(effects);
  };
}
export function createReducer(rootName: string, state: InitState, ...cases: Case[]) {
  function creator(
    name: string,
    initState: InitState,
    reducerCaseDict: { [x: string]: ReduxReducer },
    sagas?: SagaEffect
  ) {
    return {
      name,
      reducer: (state: InitState, action: ReduxAction) => {
        if (typeof state === 'undefined') return initState;
        return typeof reducerCaseDict[action.type] === 'function'
          ? reducerCaseDict[action.type](action, state)
          : state;
      },
      sagas,
    };
  }
  const caseDict = createReducerCaseDict(...cases);
  const sagas = createRootSaga(...cases);
  return creator(rootName, state, caseDict, sagas as any);
}
/**
 * @deprecated the `createPersistReducer` function is still under development
 */
export function createPersistReducer(rootName: string, state: InitState, ...cases: Case[]) {
  function creator(
    name: string,
    initState: InitState,
    reducerCaseDict: { [x: string]: ReduxReducer },
    sagas?: SagaEffect
  ) {
    return {
      name,
      reducer: persistReducer(
        {
          key: rootName,
          storage,
          stateReconciler: autoMergeLevel2,
        },
        function reducer(state: InitState, action: ReduxAction) {
          if (typeof state === 'undefined') return initState;
          return typeof reducerCaseDict[action.type] === 'function'
            ? reducerCaseDict[action.type](action, state)
            : state;
        } as any
      ),
      sagas,
    };
  }
  const caseDict = createReducerCaseDict(...cases);
  const sagas = createRootSaga(...cases);
  return creator(rootName, state, caseDict, sagas as any);
}
export function createRootSelector<State extends { [x: string]: any }>(rootName: string) {
  return function selector(state: ReduxStore) {
    return get(state, rootName) as State | undefined;
  };
}
export function createNestedReducer(
  name: string,
  initialState: InitState,
  cases: Case[],
  sagas?: SagaEffect,
  subReducers?: CombinedRootReducer[]
) {
  const combineSagas = subReducers?.filter?.((c) => c.sagas).map((r) => r.sagas) || [];
  if (!!sagas) combineSagas.push(sagas as any);
  const caseDict = createReducerCaseDict(...cases);
  return {
    name: name,
    reducer: (state: InitState, action: ReduxAction) => {
      let combineState = {};
      if (typeof state === 'undefined') combineState = { ...initialState };
      if (typeof caseDict[action.type] === 'function') {
        combineState = caseDict[action.type](action, state);
      } else {
        combineState = { ...initialState, ...state };
      }
      subReducers?.forEach?.((c) => {
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
}
