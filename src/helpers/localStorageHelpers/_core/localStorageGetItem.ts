const localStorageGetItem = <T>(key: string, validate?: (value: T | null) => boolean): T | null => {
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
    const val = JSON.parse(value) as T;
    if (typeof validate === 'function') {
      returns = validate(val) === true ? val : null
    } else
      returns = val;
  } catch (error) {
    //console.log(error);
    returns = value as T;
  } finally {
    return returns;
  }
};
export default localStorageGetItem;
