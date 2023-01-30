import newLocalStorageListenableItem from '@/helpers/localStorageHelpers/newLocalStorageListenableItem';
import { TAuthenticationJWT } from '@/_types/TAuthentication';
import { validate } from '@/appCookies/authentication';

/**
 * @deprecated authentication was stored in browser cookie, for common action, use `@/appCookies/authentication`.
 * @description this key was only used for sync between tabs
 */
const authentication = newLocalStorageListenableItem<TAuthenticationJWT>({ key: 'authentication', validate });
export default authentication;
