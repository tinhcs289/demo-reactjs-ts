import { RETURN_URI_HASH } from '@/constants/queryString';
import aesCrypt from '@/helpers/cryptHelpers/aesCrypt';
import useQueryString from '@/hooks/useQueryString';

const useReturnUrlHash = () => {
  const query = useQueryString();
  const returnUriHash = query.get(RETURN_URI_HASH);

  if (!returnUriHash) return null;

  return aesCrypt.decrypt(returnUriHash);
};
export default useReturnUrlHash;
