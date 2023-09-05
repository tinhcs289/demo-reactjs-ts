import markAsNotBeenActivated from './markAsNotBeenActivated';
import unMarkAsNotBeenActivated from './unMarkAsNotBeenActivated';
export const cases = [markAsNotBeenActivated, unMarkAsNotBeenActivated];
export const actions = {
  markAsNotBeenActivated: markAsNotBeenActivated.action,
  unMarkAsNotBeenActivated: unMarkAsNotBeenActivated.action,
};
