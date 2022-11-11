const isObject = (value: any) =>
  typeof value === 'object' && value !== null && typeof value.hasOwnProperty === 'function';
export default isObject;
