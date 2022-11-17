import { TGenericAction, TObject } from '@/helpers/reduxSagaHelpers/_types';
import { ImmutableObject } from 'seamless-immutable';

const _action =
  <T extends TObject>(type: string) =>
  (payload: T) => ({ type, payload });

const createActionNew = <T extends TObject, U extends TObject>(
  type: string,
  reducer: (action: TGenericAction<U>, state: ImmutableObject<T>) => T,
  ref: { [x: string]: any },
) => {
  ref[type] = reducer;
  return _action<U>(type);
};
export default createActionNew;
