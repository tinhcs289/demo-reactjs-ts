import toBeginOfDay from '@/helpers/formatHelpers/toBeginOfDay';
import type { Moment } from 'moment';
import moment from 'moment';
export default function isToday(day: Moment) {
  if (!day) return false;
  if (!moment.isMoment(day)) return false;
  const toDay = toBeginOfDay(moment());
  const _day = toBeginOfDay(day);
  return toDay.isSame(_day);
}
