import userProfile from '@/browser/localStorage/userProfile';
import { EApiRequestStatus } from '@/constants/apiRequestStatus';
import type { UserProfile } from '@/types';
import Immutable from 'seamless-immutable';
export type State = {
  data: UserProfile | null;
  getUserProfileRequestStatus: EApiRequestStatus;
  updateUserProfileRequestStatus: EApiRequestStatus;
};
const profile = userProfile.get();
export const rootName = 'userProfile';
const state = Immutable<State>({
  data: {
    id: '',
    username: '',
    displayname: '',
    firstName: '',
    middleName: '',
    lastName: '',
    avatar: '',
    email: '',
    phone: '',
    ...profile,
  },
  getUserProfileRequestStatus: EApiRequestStatus.NONE,
  updateUserProfileRequestStatus: EApiRequestStatus.NONE,
});
export default state;
export type NextState = typeof state;
