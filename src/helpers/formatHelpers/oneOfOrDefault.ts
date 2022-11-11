import isOneOf from '@/helpers/commonHelpers/isOneOf';

const oneOfOrDefault = <T>(value: T, collection: T[], defaultValue?: T) => {
  const _is = isOneOf(value, collection);

  return _is ? value : !!defaultValue ? defaultValue : collection[0];
};
export default oneOfOrDefault;
