import byAlphabetASC from '@/helpers/arraySortHelpers/byAlphabetASC';
import byAlphabetDESC from '@/helpers/arraySortHelpers/byAlphabetDESC';
import byMomentASC from '@/helpers/arraySortHelpers/byMomentASC';
import byMomentDESC from '@/helpers/arraySortHelpers/byMomentDESC';
import byNumberASC from '@/helpers/arraySortHelpers/byNumberASC';
import byNumberDESC from '@/helpers/arraySortHelpers/byNumberDESC';

/**
 * @example
 * const compareFn = inTheFollowingOrders(
 *  sortByAlphabetASC(u => `${u.firstName} ${u.lastName}`),
 *  sortByNumberDESC('age'),
 *  sortByMomentDESC('joinDate'),
 * )
 * const sortedUsers = user.sort(compareFn)
 *
 * @example
 * import inTheFollowingOrders, { by } from "@/helpers/arraySortHelpers/inTheFollowingOrders"
 *
 * const sortedUsers = user.sort(inTheFollowingOrders(
 *  by.alphabetASC(u => `${u.firstName} ${u.lastName}`),
 *  by.numberDESC('age'),
 *  by.momentDESC('joinDate')),
 * );
 */
export default function inTheFollowingOrders<T>(...compareFn: ((a: T, b: T) => number)[]) {
  return function (a: T, b: T) {
    let i = 0,
      compare = 0;
    while (compare === 0 && i < compareFn.length) {
      if (typeof compareFn[i] === 'function') compare = compareFn[i](a, b) || 0;
      i++;
    }
    return compare;
  };
}
export const by = {
  alphabetASC: byAlphabetASC,
  alphabetDESC: byAlphabetDESC,
  momentASC: byMomentASC,
  momentDESC: byMomentDESC,
  numberASC: byNumberASC,
  numberDESC: byNumberDESC,
};
