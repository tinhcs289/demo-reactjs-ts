import cloneDeep from 'lodash/cloneDeep';
import inTheFollowingOrders from './inTheFollowingOrders';

/**
 * @example
 * const sortedUserList = arrayLinearSort(
 *  users,
 *  byAlphabetASC(user => `${user.firstName} ${user.lastName}`),
 *  byNumberDESC('age'),
 *  (user1, user2) => user1.level - user2.level,
 *  ...
 * )
 */
const arrayLinearSort = <T>(arr: T[] = [], ...sortFns: ((a: T, b: T) => number)[]) => {
  if (!(arr instanceof Array && arr.length > 0)) return [];

  let _array = cloneDeep(arr);
  _array.sort(inTheFollowingOrders(...sortFns));
  return _array;
};
export default arrayLinearSort;
