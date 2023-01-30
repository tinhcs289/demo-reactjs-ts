import moment from 'moment';

const momentOrDefault = (value?: string | moment.Moment | Date, defaultValue?: moment.Moment) => {
  if (!value) return null;

  if (value instanceof Date) return moment(value);

  if (typeof value === 'string') {
    //#region YYYY-MM-DD
    // eslint-disable-next-line no-useless-escape
    if (/^[1-9][0-9]{3}\-[0-9]{2}\-[0-9]{2}$/.test(value))
      return moment(`${value} 00:01`, 'YYYY-MM-DD HH:mm');
    //#endregion

    //#region YYYY-MM-DD HH:mm:ss
    // eslint-disable-next-line no-useless-escape
    if (/^[1-9][0-9]{3}\-[0-9]{2}\-[0-9]{2}\s[0-9]{2}\:[0-9]{2}\:[0-9]{2}$/.test(value))
      return moment(value, 'YYYY-MM-DD HH:mm:ss');
    //#endregion

    //#region YYYY-MM-DDTHH:mm:ss
    // eslint-disable-next-line no-useless-escape
    if (/^[1-9][0-9]{3}\-[0-9]{2}\-[0-9]{2}\T[0-9]{2}\:[0-9]{2}\:[0-9]{2}$/.test(value))
      return moment(value, 'YYYY-MM-DDTHH:mm:ss');
    //#endregion

    //#region YYYY-MM-DDTHH:mm:ssZ
    // eslint-disable-next-line no-useless-escape
    if (/^[1-9][0-9]{3}\-[0-9]{2}\-[0-9]{2}\T[0-9]{2}\:[0-9]{2}\:[0-9]{2}\Z$/.test(value))
      return moment(value, 'YYYY-MM-DDTHH:mm:ssZ');

    //#region YYYY-MM-DD HH:mm:ss.SS
    // eslint-disable-next-line no-useless-escape
    if (/^[1-9][0-9]{3}\-[0-9]{2}\-[0-9]{2}\s[0-9]{2}\:[0-9]{2}\:[0-9]{2}\.[0-9]{2}$/.test(value))
      return moment(value, 'YYYY-MM-DD HH:mm:ss.SS');
    //#endregion

    //#region YYYY-MM-DDTHH:mm:ss.SSZ
    // eslint-disable-next-line no-useless-escape
    if (/^[1-9][0-9]{3}\-[0-9]{2}\-[0-9]{2}\s[0-9]{2}\:[0-9]{2}\:[0-9]{2}\.[0-9]{2}\Z$/.test(value))
      return moment(value, 'YYYY-MM-DD HH:mm:ss.SSZ');
    //#endregion

    //#region YYYY-MM-DDTHH:mm:ss.SS
    // eslint-disable-next-line no-useless-escape
    if (/^[1-9][0-9]{3}\-[0-9]{2}\-[0-9]{2}\T[0-9]{2}\:[0-9]{2}\:[0-9]{2}\.[0-9]{2}$/.test(value))
      return moment(value, 'YYYY-MM-DD HH:mm:ss.SS');
    //#endregion
  }

  if (moment.isMoment(value)) return moment(value);

  return defaultValue;
};
export default momentOrDefault;
