const localStorageRemoveItem = (key: string) => {
  if (
    !key ||
    typeof Storage === 'undefined' ||
    typeof window === 'undefined' ||
    typeof window.localStorage === 'undefined' ||
    typeof window.localStorage.removeItem !== 'function'
  ) {
    return;
  }

  return window.localStorage.removeItem(key);
};
export default localStorageRemoveItem;
