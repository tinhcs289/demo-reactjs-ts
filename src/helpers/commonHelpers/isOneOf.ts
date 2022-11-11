const isOneOf = <T>(value?: T, collection?: T[]) => {
  if (!(typeof value !== 'undefined' && value !== null && value !== '')) return false;
  if (!(collection instanceof Array && collection.length > 0)) return false;
  const i = collection.findIndex((val) => val === value);
  return i >= 0;
};
export default isOneOf;
