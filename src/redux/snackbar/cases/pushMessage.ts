import { SNACKBAR_VARIANT } from '@/constants/snackbar';
import { createCase } from '@/helpers/reduxHelpers';
import newGuid from '@/helpers/stringHelpers/newGuid';
import type { State } from '../state';
import { rootName } from '../state';
export type Payload = { content: string; variant: `${SNACKBAR_VARIANT}` };
const TYPE = `${rootName}/pushMessage`;
const pushMessage = createCase<Payload, State>(
  TYPE,
  (action, state) => {
    const { content, variant } = action.payload;
    return {
      ...state,
      id: newGuid(),
      message: content,
      variant: variant,
    };
  },
);
export default pushMessage;