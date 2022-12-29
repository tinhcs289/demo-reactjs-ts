import { RETURN_URI_HASH } from '@/constants/queryString';
import aesCrypt from '@/helpers/cryptHelpers/aesCrypt';

const useReturnUrlHash = () => {
  const query = new URLSearchParams(window?.location?.search);
  const returnUriHash = query.get(RETURN_URI_HASH);
  if (!returnUriHash) return null;
  const returnUri = aesCrypt.decrypt(returnUriHash.replaceAll(/\s/g, '+'));
  return returnUri;
};
export default useReturnUrlHash;
