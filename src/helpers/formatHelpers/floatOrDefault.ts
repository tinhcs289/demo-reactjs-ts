const floatOrDefault = (value: any, defaultValue: number = -1) => {
  if (typeof value === 'number' && !Number.isNaN(value)) return value;
  // eslint-disable-next-line no-useless-escape
  if (typeof value === 'string' && (value.trim().match(/^[0-9]+$/) || value.trim().match(/^[0-9]+[\.][0-9]+$/)))
    return +value.trim();

  return defaultValue;
};
export default floatOrDefault;
