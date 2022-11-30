import cookieGetItem from '@/helpers/cookieHelpers/cookieGetItem';
import cookieUpdateItem from '@/helpers/cookieHelpers/cookieUpdateItem';
import type { TCookieItem } from '@/helpers/cookieHelpers/_types';
import type { TAuthenticationJWT } from '@/_types/TAuthentication';

const KEY = 'cookie:authentication';
const authentication: TCookieItem<TAuthenticationJWT> = {
  key: KEY,
  get: () => cookieGetItem(KEY),
  set: (jwt) => cookieUpdateItem(KEY, jwt),
};
export default authentication;
