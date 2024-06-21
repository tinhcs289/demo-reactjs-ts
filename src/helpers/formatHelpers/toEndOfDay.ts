import cloneDeep from 'lodash/cloneDeep';
import type { Moment } from 'moment';
import moment from 'moment';
export default function toEndOfDay(day: Moment) {
  const newDay = cloneDeep(day);
  const dateString = `${newDay.format('DD/MM/YYYY')} 23:59:59`;
  return moment(dateString, 'DD/MM/YYYY HH:mm:ss');
}
