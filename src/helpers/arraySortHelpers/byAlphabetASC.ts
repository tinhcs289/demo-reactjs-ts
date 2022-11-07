/**
 * @example
 * ['a','b','c','e','d','g'].sort(byAlphabetASC())
 * @example
 * users.sort(byAlphabetASC('fullname'))
 * @example
 * users.sort(byAlphabetASC(u => `${u.firstName} ${u.lastName}`))
 */
const byAlphabetASC =
  <T extends { [x: string]: any }>(field?: string | ((value: T) => string)) =>
  (a: T | string, b: T | string) => {
    if (typeof a === 'string' && typeof b === 'string') return a.localeCompare(b);

    if (typeof a === 'string' || typeof b === 'string') return 0;

    if (typeof field === 'string') {
      let [s1, s2] = [a[field] as string, b[field] as string];
      return s1.localeCompare(s2);
    }

    if (typeof field === 'function') {
      let [s1, s2] = [field(a), field(b)];
      return s1.localeCompare(s2);
    }

    return 0;
  };
export default byAlphabetASC;
