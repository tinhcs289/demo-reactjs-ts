import { reduxBatch } from '@manaflair/redux-batch';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import { default as reducers } from './combine';
import getEnviromentName from '@/environments/getEnvironmentName';

const combine = {} as { [x: string]: any };
reducers.forEach((c) => {
  combine[c.name] = c.reducer;
});
const rootReducer = combineReducers(combine);

function* rootSaga() {
  yield all(
    reducers
      .filter((r) => r.sagas)
      .map((r) => r.sagas)
      .map((saga) => fork(saga as any))
  );
}

const sagaMiddleware = createSagaMiddleware();

const middleware = [
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
  }),
  sagaMiddleware,
];

const env = getEnviromentName();

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: !!env && env !== 'production' && env !== 'prod',
  enhancers: [reduxBatch],
});

sagaMiddleware.run(rootSaga);

export default store;
