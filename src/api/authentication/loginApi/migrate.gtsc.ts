import intOrDefault from '@/helpers/formatHelpers/intOrDefault';
import EMPTY_GUID from '@/helpers/stringHelpers/EMPTY_GUID';
import jwt from 'jsonwebtoken';
import type { ApiPayload, ApiReturns } from './_types';
type OrginalResponseData = {
  access_token?: string;
  expires_in?: number;
  id_token?: string;
  refresh_token?: string;
  token_type?: string;
  [x: string]: any;
};
type OrginalAuthenticateDecode = {
  preferred_username?: string;
  email?: string;
  role?: string;
  given_name?: string;
  phone_number_verified?: string;
  email_verified?: string;
  unique_name?: string;
  oi_prst?: string;
  oi_au_id?: string;
  client_id?: string;
  oi_tkn_id?: string;
  aud?: string;
  scope?: string;
  jti?: string;
  exp: number;
  iss?: string;
  iat?: number;
  [x: string]: any;
};
function migrateResponseData(orginal?: OrginalResponseData): ApiReturns | null {
  if (!orginal) return null;
  if (!orginal?.access_token) return null;
  if (!orginal?.refresh_token) return null;
  //@ts-ignore
  const migrated: ApiReturns = {};
  migrated.jwt = {
    accessToken: orginal.access_token,
    expires: intOrDefault(orginal?.expires_in, 86400),
    refreshToken: orginal.refresh_token,
  };
  try {
    const decoded = jwt.decode(orginal.access_token) as OrginalAuthenticateDecode;
    migrated.hasNotBeenActivated = !(
      decoded?.email_verified === 'True' || decoded?.phone_number_verified === 'True'
    );
    migrated.user = {
      id: EMPTY_GUID,
      username: decoded?.unique_name || '',
      email: decoded?.email || '',
    };
    return migrated;
  } catch (error) {
    console.log(error);
    return null;
  }
}
type OrginalPayload = {
  grant_type: string;
  client_id: string;
  scope: string;
  username: string;
  password: string;
  remember_me: string;
};
function migratePayload(payload: ApiPayload): OrginalPayload {
  return {
    grant_type: 'password',
    client_id: 'BienSo_App',
    scope: 'openid offline_access BienSo',
    username: payload.username,
    password: payload.password,
    remember_me: 'true',
  };
}
const migrate = {
  migrateResponseData,
  migratePayload,
};
export default migrate;
