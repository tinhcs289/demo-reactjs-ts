import { RETURN_URI_HASH } from '@/constants/queryString';
import aesCrypt from '@/helpers/cryptHelpers/aesCrypt';
import toEncodeUri from '@/helpers/stringHelpers/toEncodeUri';
import type { RouteConfig } from '@/routes';
export default function useReturnUrlHashBuilder() {
  const search = new URLSearchParams(window?.location?.search);
  const params = Array.from(search.keys()).reduce((a, v) => ({ ...a, [v]: search.get(v) }), {});
  function buildReturnHash(route: RouteConfig) {
    let returnUri = route.path || '';
    if (!!params && Object.keys(params).length > 0) {
      returnUri = toEncodeUri(returnUri, params);
    }
    return { [RETURN_URI_HASH]: aesCrypt.encrypt(returnUri) };
  }
  return { buildReturnHash };
}
