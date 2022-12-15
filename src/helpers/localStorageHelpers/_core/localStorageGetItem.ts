const localStorageGetItem = <T>(key: string): T | null => {
  if (
    !key ||
    typeof Storage === 'undefined' ||
    typeof window === 'undefined' ||
    typeof window.localStorage === 'undefined' ||
    typeof window.localStorage.getItem !== 'function'
  ) {
    return null;
  }

  const value = window.localStorage.getItem(key);

  if (!value) return null;

  let returns = null;

  try {
    returns = JSON.parse(value) as T;
  } catch (error) {
    //console.log(error);
    returns = value as T;
  } finally {
    return returns;
  }
};
export default localStorageGetItem;
