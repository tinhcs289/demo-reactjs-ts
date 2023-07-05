import { createCase } from '@/helpers/reduxHelpers';
import type { State } from '../../state';
import { rootName } from '../../state';
const TYPE = `${rootName}/unMarkAsNotBeenActivated`;
const unMarkAsNotBeenActivated = createCase<any, State>(
  TYPE,
  (_action, state) => {
    return {
      ...state,
      hasNotBeenActivated: false,
      accoutNeedToBeActivated: null,
    };
  },
);
export default unMarkAsNotBeenActivated;
