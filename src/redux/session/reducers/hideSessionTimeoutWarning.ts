import { TGenericAction } from '@/helpers/reduxSagaHelpers/_types';
import { ImmutableObject } from 'seamless-immutable';
import { TActionHideSessionTimeoutWarningPayload, TReduxStateSessionTimeout } from '../_types';

const hideSessionTimeoutWarning = (
  action: TGenericAction<TActionHideSessionTimeoutWarningPayload>,
  state: ImmutableObject<TReduxStateSessionTimeout>,
): TReduxStateSessionTimeout => {
  return {
    ...state,
    isSessionTimeout: true,
  };
};
export default hideSessionTimeoutWarning;
