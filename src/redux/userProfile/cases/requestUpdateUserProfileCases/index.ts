import requestUpdateUserProfile from './requestUpdateUserProfile';
import requestUpdateUserProfileFail from './requestUpdateUserProfileFail';
import requestUpdateUserProfileSuccess from './requestUpdateUserProfileSuccess';
export const cases = [
  requestUpdateUserProfile,
  requestUpdateUserProfileFail,
  requestUpdateUserProfileSuccess,
];
export const actions = {
  requestUpdateUserProfile: requestUpdateUserProfile.action,
  requestUpdateUserProfileFail: requestUpdateUserProfileFail.action,
  requestUpdateUserProfileSuccess: requestUpdateUserProfileSuccess.action,
};
