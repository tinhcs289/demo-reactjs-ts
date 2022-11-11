import isNotNull from './isNotNull';

const isNotNullAndEquals = (value: any, compareValue: any) => {
  return isNotNull(value) && value === compareValue;
};
export default isNotNullAndEquals;
