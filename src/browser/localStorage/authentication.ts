import { newLocalStorageListenableItem } from '@/helpers/localStorageHelpers';
import { AuthenticationJWT } from '@/types';
import { validate } from '@/browser/cookies/authentication';
/**
 * @deprecated authentication was stored in browser cookie, for common action, use `@/browser/cookies/authentication`.
 * @description this key was only used for sync between tabs
 */
const authentication = newLocalStorageListenableItem<AuthenticationJWT>({ key: 'authentication', validate });
export default authentication;
