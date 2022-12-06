import createAction from '@/helpers/reduxSagaHelpers/createAction';
import { TActionShowSessionTimeoutWarningPayload } from '../_types';
import * as t from '../types';

const showSessionTimeoutWarning = createAction<TActionShowSessionTimeoutWarningPayload>(t.SESSION_TIMEOUT_WARNING_SHOW);
export default showSessionTimeoutWarning;
