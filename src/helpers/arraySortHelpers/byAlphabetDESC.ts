/**
 * @example
 * ['a','b','c','e','d','g'].sort(byAlphabetDESC())
 * @example
 * users.sort(byAlphabetDESC('fullname'))
 * @example
 * users.sort(byAlphabetDESC(u => `${u.firstName} ${u.lastName}`))
 */
const byAlphabetDESC =
  <T extends { [x: string]: any }>(field?: string | ((value: T) => string)) =>
  (a: T | string, b: T | string) => {
    if (typeof a === 'string' && typeof b === 'string') return b.localeCompare(a);

    if (typeof a === 'string' || typeof b === 'string') return 0;

    if (typeof field === 'string') {
      let [s1, s2] = [b[field] as string, a[field] as string];
      return s1.localeCompare(s2);
    }

    if (typeof field === 'function') {
      let [s1, s2] = [field(b), field(a)];
      return s1.localeCompare(s2);
    }

    return 0;
  };
export default byAlphabetDESC;
