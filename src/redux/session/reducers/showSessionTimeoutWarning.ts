import { TGenericAction } from '@/helpers/reduxSagaHelpers/_types';
import { ImmutableObject } from 'seamless-immutable';
import { TActionShowSessionTimeoutWarningPayload, TReduxStateSessionTimeout } from '../_types';

const showSessionTimeoutWarning = (
  action: TGenericAction<TActionShowSessionTimeoutWarningPayload>,
  state: ImmutableObject<TReduxStateSessionTimeout>
): TReduxStateSessionTimeout => {
  return {
    ...state,
    isSessionTimeout: true,
  };
};
export default showSessionTimeoutWarning;
