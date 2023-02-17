import { createCase } from '@/helpers/reduxHelpers';
import type { State } from '../state';
import { rootName } from '../state';
export type Payload = {
  userAccount: string;
};
const TYPE_MARK = `${rootName}/markAsNotBeenActivated`;
const markAsNotBeenActivated = createCase<Payload, State>(
  TYPE_MARK,
  (action, state) => {
    const { userAccount } = action.payload;
    return {
      ...(state as any),
      hasNotBeenActivated: true,
      accoutNeedToBeActivated: userAccount,
    };
  },
);
export default markAsNotBeenActivated;
const TYPE_UNMARK = `${rootName}/unMarkAsNotBeenActivated`;
export const unMarkAsNotBeenActivated = createCase<any, State>(
  TYPE_UNMARK,
  (action, state) => {
    return {
      ...(state as any),
      hasNotBeenActivated: false,
      accoutNeedToBeActivated: null,
    };
  },
);
