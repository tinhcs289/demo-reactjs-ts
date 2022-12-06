import Cookies from 'js-cookie';

const cookieGetItem = <T>(key: string): T | null => {
  if (!key) return null;

  const value = Cookies.get(key);

  if (!value) return null;

  let returns = null;

  try {
    returns = JSON.parse(value) as T;
  } catch (error) {
    console.log(error);
    returns = null;
  } finally {
    return returns;
  }
};
export default cookieGetItem;
