import { ImmutableObject } from 'seamless-immutable';
import { AllEffect, ForkEffect } from 'redux-saga/effects';
import { Reducer, CombinedState, Action } from 'redux';
export type TObject = { [x: string]: any };
export type InitState = ImmutableObject<TObject>;
export type TAction = { type: string; payload: TObject };
export type TReducer = (action: TAction, state: InitState) => TObject;
export type TSaga = () => Generator<AllEffect<ForkEffect<never>>, void, unknown>;
export type TReducerRoot = {
  name: string;
  reducer: (
    state: InitState,
    action: TAction
  ) => {
    [x: string]: any;
  };
  sagas?: TSaga;
};
export type TReducerRootCombined = {
  name: string;
  reducer: Reducer<
    CombinedState<{
      [x: string]: unknown;
    }>,
    Action<any>
  >;
  sagas: TSaga;
};
export type TGenericAction<T extends TObject> = { type: string; payload: T };
export type TGenericReducer<T extends TObject, U extends TObject> = (
  action: TGenericAction<U>,
  state: ImmutableObject<T>
) => T;
//#region export types
export type ReduxStore = TObject;
export type ReduxAction<T extends TObject> = TGenericAction<T>;
export type ReduxState<T> = ImmutableObject<T>;
export type ReduxCase<ActionPayload extends TObject, State> = (
  action: ReduxAction<ActionPayload>,
  state: ReduxState<State>
) => State
export type ReduxCaseSagaEffect<T extends TObject> = (action: TGenericAction<T>) => Generator<never, void, unknown>;
//#endregion