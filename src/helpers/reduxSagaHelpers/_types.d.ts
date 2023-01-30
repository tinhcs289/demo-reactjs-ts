import { ImmutableObject } from 'seamless-immutable';
import { AllEffect, ForkEffect } from 'redux-saga/effects';
import { Reducer, CombinedState, Action } from 'redux';

export type TObject = { [x: string]: any };

export type TInitState = ImmutableObject<TObject>;
export type TAction = { type: string; payload: TObject };
export type TReducer = (action: TAction, state: TInitState) => TObject;
export type TSaga = Generator<AllEffect<ForkEffect<never>>, void, unknown>;

export type TReducerRoot = {
  name: string;
  reducer: (
    state: TInitState,
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
  sagas: () => Generator<AllEffect<ForkEffect<unknown>>, void, unknown>;
};

export type TGenericAction<T extends TObject> = { type: string; payload: T };
export type TGenericReducer<T extends TObject, U extends TObject> = (
  action: TGenericAction<U>,
  state: ImmutableObject<T>
) => T;
