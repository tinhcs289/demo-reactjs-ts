import moment from 'moment';
function isNullOrAFunction(value: any) {
  if (value === null) return true;
  if (value === undefined) return true;
  if (typeof value === 'function') return true;
  return false;
}
function isPrimativeValue(value: any) {
  if (typeof value === 'number') return true;
  if (typeof value === 'string') return true;
  if (typeof value === 'boolean') return true;
  if (moment.isMoment(value)) return true;
  return false;
}
export default function getObjectFieldNamesWhichHaveValues(obj: { [x: string]: any }): string[] {
  if (!obj) return [];
  if (!(obj instanceof Object)) return [];
  const keys = Object.keys(obj);
  if (keys.length === 0) return [];
  const fieldHasValuekeys = keys.filter((fieldName) => {
    const value = obj[fieldName];
    if (isNullOrAFunction(value)) return false;
    if (isPrimativeValue(value)) return true;
    if (value instanceof Array) {
      if (value.length === 0) return false;
      else {
        return (value as Array<any>).some((item) => {
          if (isNullOrAFunction(item)) return false;
          if (isPrimativeValue(item)) return true;
          if (typeof value !== 'object') return false;
          const itemSubFieldHasValueKeys = getObjectFieldNamesWhichHaveValues(item);
          if (itemSubFieldHasValueKeys.length === 0) return false;
          return true;
        });
      }
    }
    if (typeof value !== 'object') return false;
    const subFieldHasValueKeys = getObjectFieldNamesWhichHaveValues(value);
    if (subFieldHasValueKeys.length === 0) return false;
    return true;
  });
  return fieldHasValuekeys;
}
