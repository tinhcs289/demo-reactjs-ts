import { createCase } from '@/helpers/reduxHelpers';
import type { State } from '../state';
import { rootName } from '../state';
export type Payload = { userAccount: string };
const TYPE = `${rootName}/markAsNotBeenActivated`;
const markAsNotBeenActivated = createCase<Payload, State>(
  TYPE,
  (action, state) => {
    const { userAccount } = action.payload;
    return {
      ...state,
      hasNotBeenActivated: true,
      accoutNeedToBeActivated: userAccount,
    };
  },
);
export default markAsNotBeenActivated;
