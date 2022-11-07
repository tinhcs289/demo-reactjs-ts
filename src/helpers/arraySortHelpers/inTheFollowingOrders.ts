/**
 * @example
 * const compareFn = inTheFollowingOrders(
 *  sortByAlphabetASC('name'),
 *  sortByNumberDESC('age'),
 *  sortByMomentDESC('joinDate'),
 * )
 * const new sortedUsers = user.sort(compareFn)
 *
 */
const inTheFollowingOrders =
  <T>(...compareFunctions: ((a: T, b: T) => number)[]) =>
  (a: T, b: T) => {
    let i = 0,
      compare = 0;
    while (compare === 0 && i < compareFunctions.length) {
      if (typeof compareFunctions[i] === 'function') compare = compareFunctions[i](a, b) || 0;
      i++;
    }
    return compare;
  };
export default inTheFollowingOrders;
