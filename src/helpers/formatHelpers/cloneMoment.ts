import type { Moment } from 'moment';
import moment from 'moment';
export default function cloneMoment(dateOrMoment: Moment | Date | null | undefined): Moment | null {
  if (!dateOrMoment) return null;
  if (dateOrMoment instanceof Date) return moment(dateOrMoment);
  //@ts-ignore
  if (moment.isMoment(dateOrMoment) && !!dateOrMoment['_d']) {
    try {
      //@ts-ignore
      const date = moment(dateOrMoment['_d']);
      return date;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  return null;
}
