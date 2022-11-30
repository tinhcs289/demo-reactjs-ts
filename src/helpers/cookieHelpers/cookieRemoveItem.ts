import Cookies from 'js-cookie';

const cookieRemoveItem = (key: string) => {
  if (!key) return;
  return Cookies.remove(key);
};
export default cookieRemoveItem;
