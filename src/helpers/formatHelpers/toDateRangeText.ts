import formatMoment from '@/helpers/formatHelpers/formatMoment';
import type { Moment } from 'moment';
import moment from 'moment';
export default function toDateRangeText(from: Moment | null | undefined, to: Moment | null | undefined) {
  return function (formatFn: {
    format: string;
    hasFromAndTo?: (f: string, t: string) => string;
    hasOnlyFrom?: (f: string) => string;
    hasOnlyTo?: (t: string) => string;
  }) {
    const hasFrom = !!from && moment.isMoment(from);
    const hasTo = !!to && moment.isMoment(to);
    const format = formatFn.format;
    if (hasFrom && hasTo) {
      const text = formatFn?.hasFromAndTo?.(formatMoment(from, format), formatMoment(to, format)) || '';
      return text;
    }
    if (hasFrom && !hasTo) {
      const text = formatFn?.hasOnlyFrom?.(formatMoment(from, format)) || '';
      return text;
    }
    if (!hasFrom && hasTo) {
      const text = formatFn?.hasOnlyTo?.(formatMoment(to, format)) || '';
      return text;
    }
    return '';
  };
}
