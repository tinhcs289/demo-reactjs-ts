import isValidAsYupSchema from '@/functions/isValidAsYupSchema';
import { newCookieItem } from '@/helpers/cookieHelpers';
import type { AuthenticationJWT } from '@/types';
import * as yup from 'yup';
export function validate(value: AuthenticationJWT | null) {
  return isValidAsYupSchema(value, yup.object().shape({
    accessToken: yup.string().required(),
    refreshToken: yup.string().required(),
    expires: yup.number().required(),
  }));
}
const authentication = newCookieItem<AuthenticationJWT>({ key: 'cookie:authentication', validate });
export default authentication;