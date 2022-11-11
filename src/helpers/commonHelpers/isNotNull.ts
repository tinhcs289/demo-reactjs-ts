const isNotNull = (value: any) => {
  if (typeof value === 'number') return !Number.isNaN(value);
  return typeof value !== 'undefined' && value !== null && value !== '';
};
export default isNotNull;
