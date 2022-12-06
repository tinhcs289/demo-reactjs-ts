const localStorageUpdateItem = <T>(key: string, value: T) => {
  if (
    !key ||
    typeof Storage === 'undefined' ||
    typeof window === 'undefined' ||
    typeof window.localStorage === 'undefined' ||
    typeof window.localStorage.setItem !== 'function'
  ) {
    return;
  }

  return window.localStorage.setItem(key, JSON.stringify(value));
};
export default localStorageUpdateItem;
