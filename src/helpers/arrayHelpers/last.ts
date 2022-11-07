/**
 * @example const lastUser = last(users)
 * @example const lastUserWhoIsMale = last(users, u => u.gender === male)
 */
const last = <T>(_array: T[], _predicate?: (t: T) => boolean) => {
  if (typeof _predicate === 'function') {
    const _filterArray = _array.filter((o) => _predicate(o) === true);
    return _filterArray.length > 0 ? _filterArray[_filterArray.length - 1] : null;
  } else {
    return _array.length > 0 ? _array[_array.length - 1] : null;
  }
};
export default last;
