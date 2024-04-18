import userProfile from '@/browser/localStorage/userProfile';
import { HttpRequestStatus } from '@/constants/apiRequestStatus';
import type { UserProfile } from '@/types';
import Immutable from 'seamless-immutable';
export type State = {
  data: UserProfile | null;
  getUserProfileRequestStatus: HttpRequestStatus;
  updateUserProfileRequestStatus: HttpRequestStatus;
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
  getUserProfileRequestStatus: HttpRequestStatus.NONE,
  updateUserProfileRequestStatus: HttpRequestStatus.NONE,
});
export default state;
export type NextState = typeof state;
