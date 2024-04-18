import { RETURN_URI_HASH } from '@/constants/queryString';
import aesCrypt from '@/helpers/cryptHelpers/aesCrypt';
import toEncodeUri from '@/helpers/stringHelpers/toEncodeUri';
import type { RouteConfig } from '@/routes';
import { useCallback } from 'react';
export default function useReturnUrlHashBuilder() {
  const search = new URLSearchParams(window?.location?.search);
  const params = Array.from(search.keys()).reduce((a, v) => ({ ...a, [v]: search.get(v) }), {});
  const buildReturnHash = useCallback(
    (route?: RouteConfig) => {
      let returnUri = route?.path || window.location.pathname;
      if (!!params && Object.keys(params).length > 0) {
        returnUri = toEncodeUri(returnUri, params);
      }
      return { [RETURN_URI_HASH]: aesCrypt.encrypt(returnUri) };
    },
    [params]
  );
  return { buildReturnHash };
}
