/**
 * @example
 * [3, 6, 1, 4, 4, 8].sort(byNumberDESC())
 * @example
 * users.sort(byNumberDESC('age'))
 * @example
 * users.sort(byNumberDESC(u => toDay - u.dayOfBirth))
 */
const byNumberDESC =
  <T extends { [x: string]: any }>(field?: string | ((value: T) => number)) =>
  (a: T | number, b: T | number) => {
    if (typeof a === 'number' && typeof b === 'number') {
      let [n1, n2] = [b, a];
      return n1 - n2 === 0 ? 0 : n2 - n1 > 0 ? -1 : 1;
    }

    if (typeof a === 'number' || typeof b === 'number') return 0;

    if (typeof field === 'string') {
      let [n1, n2] = [b[field] as number, a[field] as number];

      return n1 - n2 === 0 ? 0 : n2 - n1 > 0 ? -1 : 1;
    }

    if (typeof field === 'function') {
      let [n1, n2] = [field(b), field(a)];
      return n1 - n2 === 0 ? 0 : n2 - n1 > 0 ? -1 : 1;
    }

    return 0;
  };
export default byNumberDESC;
