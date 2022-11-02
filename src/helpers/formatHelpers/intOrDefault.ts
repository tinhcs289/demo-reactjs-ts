const intOrDefault = (value: any, defaultValue: number = -1) => {
  if (typeof value === 'string' && value.trim().match(/^[0-9]+$/)) {
    return +value;
  }

  return typeof value === 'number' && !Number.isNaN(value) ? Number(value) : defaultValue;
};
export default intOrDefault;
