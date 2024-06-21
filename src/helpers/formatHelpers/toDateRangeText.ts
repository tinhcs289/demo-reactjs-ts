import formatMoment from '@/helpers/formatHelpers/formatMoment';
import type { Moment } from 'moment';
import moment from 'moment';
function toDateText(date: Moment, args: { format?: string; dateText?: (date: Moment) => string }) {
  if (!date || !moment.isMoment(date)) return '';
  if (typeof args?.dateText === 'function') {
    const text = args.dateText(date);
    if (typeof text !== 'string') return '';
    return text;
  }
  return formatMoment(date, args?.format || '');
}
export default function toDateRangeText(from: Moment | null | undefined, to: Moment | null | undefined) {
  return function (formatFn: {
    format: string;
    hasFromAndTo?: (f: string, t: string) => string;
    hasOnlyFrom?: (f: string) => string;
    hasOnlyTo?: (t: string) => string;
    dateText?: (date: Moment) => string;
  }) {
    const hasFrom = !!from && moment.isMoment(from);
    const hasTo = !!to && moment.isMoment(to);
    const format = formatFn.format;
    const dateText = formatFn.dateText;
    if (hasFrom && hasTo) {
      const text =
        formatFn?.hasFromAndTo?.(
          toDateText(from, { format, dateText }),
          toDateText(to, { format, dateText })
        ) || '';
      return text;
    }
    if (hasFrom && !hasTo) {
      const text = formatFn?.hasOnlyFrom?.(toDateText(from, { format, dateText })) || '';
      return text;
    }
    if (!hasFrom && hasTo) {
      const text = formatFn?.hasOnlyTo?.(toDateText(to, { format, dateText })) || '';
      return text;
    }
    return '';
  };
}
