import authentication from '@/browser/cookies/authentication';
import { default as authenticationInLocalStorage } from '@/browser/localStorage/authentication';
import userPermissions from '@/browser/localStorage/userPermissions';
import userProfile from '@/browser/localStorage/userProfile';
import userRoles from '@/browser/localStorage/userRoles';
import type { Authentication } from '@/types';
import omit from 'lodash/omit';
const userDataStorage = {
  set: (data: Authentication) => {
    const { jwt, user } = data;
    // storage user's profile
    userProfile.set(omit(user, ['roles', 'policies']));
    // storage permissions/policies
    userPermissions.set(user?.policies instanceof Array ? user.policies : []);
    // storage roles
    userRoles.set(user?.roles instanceof Array ? user.roles : []);
    // storage JWT data
    authentication.set(jwt);
    authenticationInLocalStorage.set(jwt, true);
  },
  clear: () => {
    // storage user's profile
    userProfile.clear();
    // clear permissions/policies
    userPermissions.clear();
    // clear roles
    userRoles.clear();
    // clear JWT data
    authentication.clear();
    authenticationInLocalStorage.set(null, true);
  },
};
export default userDataStorage;
