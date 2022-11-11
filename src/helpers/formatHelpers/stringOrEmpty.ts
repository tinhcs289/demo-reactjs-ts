const stringOrEmpty = (value: any, defaultValue: string = '') => {
  return typeof value === 'string' ? value.trim() : defaultValue;
};
export default stringOrEmpty;
