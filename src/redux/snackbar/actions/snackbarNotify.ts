import createAction from '@/helpers/reduxSagaHelpers/createAction';
import { TActionPushMessagePayload } from './_types';
import * as t from '../types';

const snackbarNotify = createAction<TActionPushMessagePayload>(t.SNACKBAR_PUSHMESSAGE);
export default snackbarNotify;
