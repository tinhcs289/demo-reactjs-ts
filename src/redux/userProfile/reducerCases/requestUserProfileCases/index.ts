import requestUserProfile from './requestUserProfile';
import requestUserProfileFail from './requestUserProfileFail';
import requestUserProfileSuccess from './requestUserProfileSuccess';
export const cases = [requestUserProfile, requestUserProfileFail, requestUserProfileSuccess];
export const actions = {
  requestUserProfile: requestUserProfile.action,
  requestUserProfileFail: requestUserProfileFail.action,
  requestUserProfileSuccess: requestUserProfileSuccess.action,
};
