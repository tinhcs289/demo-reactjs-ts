import type { Moment } from 'moment';
import moment from 'moment';
export default function formatMoment(dateOrMoment: Moment | Date | null | undefined, format: string): string {
  if (!dateOrMoment) return '';
  if (dateOrMoment instanceof Date) return moment(dateOrMoment).format(format);
  //@ts-ignore
  if (moment.isMoment(dateOrMoment) && !!dateOrMoment['_d']) {
    try {
      //@ts-ignore
      const date = moment(dateOrMoment['_d']);
      const formatString = date.format(format);
      return formatString;
    } catch (error) {
      console.log(error);
      return '';
    }
  }
  return '';
}
