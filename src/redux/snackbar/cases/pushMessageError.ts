import { SNACKBAR_VARIANT } from '@/constants/snackbar';
import type { ReduxAction } from '@/helpers/reduxHelpers';
import { createCase } from '@/helpers/reduxHelpers';
import newGuid from '@/helpers/stringHelpers/newGuid';
import { delay, takeLatest } from 'redux-saga/effects';
import type { State } from '../state';
import { rootName } from '../state';
export type Payload = {
  content: string;
};
const TYPE = `${rootName}/pushMessageError`;
const pushMessageError = createCase<Payload, State>(
  TYPE,
  (action, state) => {
    const { content } = action.payload;
    return {
      ...state,
      id: newGuid(),
      message: content,
      variant: SNACKBAR_VARIANT.ERROR,
    };
  },
  takeLatest(TYPE, function* (action: ReduxAction<Payload>) {
    console.log(action.payload);
    yield delay(1000);
  }),
);
export default pushMessageError;