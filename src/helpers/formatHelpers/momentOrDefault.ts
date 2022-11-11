import moment from 'moment';

const momentOrDefault = (value: string | moment.Moment | Date, defaultValue?: moment.Moment) => {
  if (!value) return null;

  if (value instanceof Date) return moment(value);

  if (typeof value === 'string') {
    // eslint-disable-next-line no-useless-escape
    if (/^[1-9][0-9]{3}\-[0-9]{2}\-[0-9]{2}$/.test(value)) return moment(`${value} 00:01`, 'YYYY-MM-DD HH:mm');

    // eslint-disable-next-line no-useless-escape
    if (/^[1-9][0-9]{3}\-[0-9]{2}\-[0-9]{2}\s[0-9]{2}\:[0-9]{2}\:[0-9]{2}$/.test(value))
      return moment(value, 'YYYY-MM-DD HH:mm:ss');

    // eslint-disable-next-line no-useless-escape
    if (/^[1-9][0-9]{3}\-[0-9]{2}\-[0-9]{2}\T[0-9]{2}\:[0-9]{2}\:[0-9]{2}$/.test(value))
      return moment(value, 'YYYY-MM-DDTHH:mm:ss');

    // eslint-disable-next-line no-useless-escape
    if (/^[1-9][0-9]{3}\-[0-9]{2}\-[0-9]{2}\T[0-9]{2}\:[0-9]{2}\:[0-9]{2}\Z$/.test(value))
      return moment(value, 'YYYY-MM-DDTHH:mm:ssZ');
  }

  if (moment.isMoment(value)) return moment(value);

  return defaultValue;
};
export default momentOrDefault;
