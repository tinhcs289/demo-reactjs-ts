import { HttpApiEndpoint } from "@/types";
const endpoints: { [x: string]: HttpApiEndpoint } = {
  login: { url: '/api/auth/sign-in', isMock: true },
  logout: { url: '/api/auth/sign-out', isMock: true },
  refreshAuthenticateToken: { url: '/api/auth/refresh-auth-token', isMock: true },
  verifyAuthenticateToken: { url: '/api/auth/verify-auth-token', isMock: true },
  activateAccountWithOtp: { url: '/api/auth/account-activate', isMock: true },
  register: { url: '/api/auth/sign-up', isMock: true },
  requestOtpForResetPassword: { url: '/api/auth/account-request-opt-for-reset-password', isMock: true },
  updatePasswordWithOtp: { url: '/api/auth/account-update-password-by-otp', isMock: true },
  updatePasswordWithOldPassword: { url: '/api/auth/account-update-password', isMock: true },
  uploadFile: { url: '/api/file/upload-single', isMock: true },
  getUserProfile: { url: '/api/user', isMock: true },
  updateUserProfile: { url: '/api/user', isMock: true },
};
export default endpoints;