import type { Moment } from 'moment';
export type DateRange = {
  From?: Moment | null;
  To?: Moment | null;
};
export type DayOfWeek = 'MON' | 'TUE' | 'WEB' | 'THU' | 'PRI' | 'SAT' | 'SUN';
