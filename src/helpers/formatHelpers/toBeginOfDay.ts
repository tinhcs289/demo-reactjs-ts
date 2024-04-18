import cloneDeep from 'lodash/cloneDeep';
import type { Moment } from 'moment';
import moment from 'moment';
export default function toBeginOfDay(day: Moment) {
  const newDay = cloneDeep(day);
  const dateString = `${newDay.format('DD/MM/YYYY')} 00:00:01`;
  return moment(dateString, 'DD/MM/YYYY HH:mm:ss');
}
