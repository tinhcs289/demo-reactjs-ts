import Cookies from 'js-cookie';

const cookieGetItem = <T>(key: string, validate?: (value: T | null) => boolean): T | null => {
  if (!key) return null;

  const value = Cookies.get(key);

  if (!value) return null;

  let returns = null;

  try {
    const val = JSON.parse(value) as T;
    if (typeof validate === 'function') {
      returns = validate(val) === true ? val : null;
    } else returns = val;
  } catch (error) {
    console.log(error);
    returns = null;
  } finally {
    return returns;
  }
};
export default cookieGetItem;
