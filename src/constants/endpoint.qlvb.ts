import getDefaultBackendEndpoint from '@/environments/getDefaultBackendEndpoint';
import { HttpApiEndpoint } from '@/types';
const DEFAULT = getDefaultBackendEndpoint();
const endpoints_qlvb = {
  login: { url: `${DEFAULT}/auth/login` },
  logout: { url: '/api/auth/sign-out', isMock: true },
  refreshAuthenticateToken: {
    url: `${DEFAULT}/auth/refresh-token`,
  },
  verifyAuthenticateToken: { url: '/api/auth/verify-auth-token', isMock: true },
  activateAccountWithOtp: { url: '/api/auth/account-activate', isMock: true },
  register: { url: '/api/auth/sign-up', isMock: true },
  requestOtpForResetPassword: {
    url: '/api/auth/account-request-opt-for-reset-password',
    isMock: true,
  },
  updatePasswordWithOtp: {
    url: '/api/auth/account-update-password-by-otp',
    isMock: true,
  },
  updatePasswordWithOldPassword: {
    url: '/api/auth/account-update-password',
    isMock: true,
  },
  uploadFile: { url: '/api/file/upload-single', isMock: true },
  getUserProfile: { url: `${DEFAULT}/can-bo/get-canbo-info` },
  updateUserProfile: { url: '/api/user', isMock: true },
};
export type EndpointDictionary = { [key in keyof typeof endpoints_qlvb]: HttpApiEndpoint };
export default endpoints_qlvb as EndpointDictionary;
