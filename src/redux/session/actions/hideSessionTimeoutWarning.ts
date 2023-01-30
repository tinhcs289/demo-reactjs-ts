import createAction from '@/helpers/reduxSagaHelpers/createAction';
import { TActionHideSessionTimeoutWarningPayload } from '../_types';
import * as t from '../types';

const hideSessionTimeoutWarning = createAction<TActionHideSessionTimeoutWarningPayload>(
  t.SESSION_TIMEOUT_WARNING_HIDE
);
export default hideSessionTimeoutWarning;
