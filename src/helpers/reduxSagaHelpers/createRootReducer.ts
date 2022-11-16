import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { TReducerRoot } from './types';

const createRootReducer = (name: string, reducers: TReducerRoot[]) => {
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
};
export default createRootReducer;
