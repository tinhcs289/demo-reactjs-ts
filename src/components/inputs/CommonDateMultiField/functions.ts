import removeAt from '@/helpers/arrayHelpers/removeAt';
import byMomentASC from '@/helpers/arraySortHelpers/byMomentASC';
import cloneDeep from 'lodash/cloneDeep';
import type { Moment } from 'moment';
import moment from 'moment';
import type { DateTagInputItem } from './_types';
import { DEFAULT_FORMAT } from './constants';
export function addOrRemoveDate(date: Moment, listDate: Moment[] = []): Moment[] {
  if (!date || !moment.isMoment(date)) return [];
  let newDates = cloneDeep(listDate);
  if (newDates.length === 0) {
    newDates.push(date);
    return newDates;
  }
  const index = newDates.findIndex((_) => _.isSame(date, 'date'));
  if (index === -1) {
    newDates.push(date);
    newDates.sort(byMomentASC());
    return newDates;
  }
  newDates = removeAt(newDates, index);
  if (newDates.length > 0) newDates.sort(byMomentASC());
  return newDates;
}
export function datesFromTags(tags?: DateTagInputItem[]) {
  if (!tags || !Array.isArray(tags) || tags.length === 0) {
    return [];
  }
  const newDates = tags.filter((t) => moment.isMoment(t?.date)).map((t) => t.date);
  return newDates;
}
export function tagsFromDates(dates: Moment[], format?: string) {
  if (!dates || !Array.isArray(dates)) return [];
  return dates.map((d) => {
    const text = d.format(format || DEFAULT_FORMAT);
    return { id: text, label: text, date: d };
  });
}
