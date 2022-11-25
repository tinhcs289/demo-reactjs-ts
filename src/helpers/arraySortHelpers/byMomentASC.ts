import moment from 'moment';
import type { Moment } from 'moment';

/**
 * @example
 * [date1, date3, date7, date5, date4].sort(byMomentASC())
 * @example
 * users.sort(byMomentASC('dayOfBirth'))
 * @example
 * users.sort(byMomentASC(u => getDayOfBirth(u)))
 */
const byMomentASC =
  <T extends { [x: string]: any }>(field?: string | ((value: T) => Moment)) =>
  (a: T | Moment, b: T | Moment) => {
    if (moment.isMoment(a) && moment.isMoment(b)) return a.diff(b);

    if (moment.isMoment(a) || moment.isMoment(a)) return 0;

    if (typeof field === 'string') {
      let [n1, n2] = [(a as T)[field] as Moment, (b as T)[field] as Moment];
      const _diff = n1.diff(n2);
      return _diff === 0 ? 0 : _diff > 0 ? -1 : 1;
    }

    if (typeof field === 'function') {
      let [n1, n2] = [field(a as T), field(b as T)];
      const _diff = n1.diff(n2);
      return _diff === 0 ? 0 : _diff > 0 ? -1 : 1;
    }

    return 0;
  };
export default byMomentASC;