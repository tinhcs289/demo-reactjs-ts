import { TGenericAction } from '@/helpers/reduxSagaHelpers/_types';
import newGuid from '@/helpers/stringHelpers/newGuid';
import { ImmutableObject } from 'seamless-immutable';
import { TReduxStateSnackbar, TActionPushMessagePayload } from '../_types';

const snackbarNotify = (
  action: TGenericAction<TActionPushMessagePayload>,
  state: ImmutableObject<TReduxStateSnackbar>
): TReduxStateSnackbar => {
  const { content, variant } = action.payload;
  return {
    ...state,
    id: newGuid(),
    message: content,
    variant: variant,
  };
};
export default snackbarNotify;
