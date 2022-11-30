import Cookies from 'js-cookie';

const cookieUpdateItem = <T>(key: string, value: T) => {
  if (!key) return;

  return Cookies.set(key, JSON.stringify(value));
};
export default cookieUpdateItem;
