const isGuid = (value: any) => {
  if (typeof value !== 'string') return false;
  const rgx = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return rgx.test(value);
};
export default isGuid;
