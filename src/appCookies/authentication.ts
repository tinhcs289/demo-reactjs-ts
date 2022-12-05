import newCookieItem from '@/helpers/cookieHelpers/newCookieItem';
import type { TAuthenticationJWT } from '@/_types/TAuthentication';

const authentication = newCookieItem<TAuthenticationJWT>({ key: 'cookie:authentication' });
export default authentication;
