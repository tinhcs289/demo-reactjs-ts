import isValidAsYupSchema from '@/functions/isValidAsYupSchema';
import newCookieItem from '@/helpers/cookieHelpers/newCookieItem';
import type { TAuthenticationJWT } from '@/types';
import * as yup from 'yup';
export function validate(value: TAuthenticationJWT | null) {
  return isValidAsYupSchema(value, yup.object().shape({
    accessToken: yup.string().required(),
    refreshToken: yup.string().required(),
    expires: yup.number().required(),
  }));
}
const authentication = newCookieItem<TAuthenticationJWT>({ key: 'cookie:authentication', validate });
export default authentication;
