import cloneDeep from 'lodash/cloneDeep';

const removeItem = <T>(arr: T[] = [], exp: (i: T) => boolean = (i) => true) => {
  const newArr = cloneDeep(arr);
  const index = newArr.findIndex(exp);
  if (index >= 0) {
    let result = newArr.slice(0, index);
    result = result.concat(arr.slice(index + 1, newArr.length));
    return result;
  }
  return undefined;
};
export default removeItem;
