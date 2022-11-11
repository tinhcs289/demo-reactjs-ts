import cloneDeep from 'lodash/cloneDeep';

const updateItem = <T>(arr: T[] = [], item: T, exp: (i: T) => boolean = (i) => true) => {
  if (!(arr instanceof Array && arr.length > 0 && !!item && typeof exp === 'function')) return [];

  const newArr = cloneDeep(arr);
  const i = newArr.findIndex(exp);

  if (i === 0) return newArr;

  newArr[i] = item;
  return newArr;
};
export default updateItem;
