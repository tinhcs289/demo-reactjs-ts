import { RETURN_URI_HASH } from '@/constants/queryString';
import aesCrypt from '@/helpers/cryptHelpers/aesCrypt';
import toEncodeUri from '@/helpers/stringHelpers/toEncodeUri';
import { TRouteConfig } from '@/routes/_types';

const useReturnUrlHashBuilder = () => {
  const search = new URLSearchParams(window?.location?.search);
  const params = Array.from(search.keys()).reduce((acc, val) => ({ ...acc, [val]: search.get(val) }), {});

  const buildReturnHash = (route: TRouteConfig) => {
    let returnUri = route.path || '';
    if (!!params && Object.keys(params).length > 0) {
      returnUri = toEncodeUri(returnUri, params);
    }

    return { [RETURN_URI_HASH]: aesCrypt.encrypt(returnUri) };
  };

  return { buildReturnHash };
};
export default useReturnUrlHashBuilder;
