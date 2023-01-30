import newCookieItem from '@/helpers/cookieHelpers/newCookieItem';
import type { TAuthenticationJWT } from '@/_types/TAuthentication';
import * as yup from 'yup';

const schema = yup.object().shape({
  accessToken: yup.string().required(),
  refreshToken: yup.string().required(),
  expires: yup.number().required(),
});

export function validate(value: TAuthenticationJWT | null) {
  try {
    debugger;
    schema.validateSync(value);
    debugger;
    return true;
  } catch (error) {
    return false;
  }
}

const authentication = newCookieItem<TAuthenticationJWT>({ key: 'cookie:authentication', validate });
export default authentication;
