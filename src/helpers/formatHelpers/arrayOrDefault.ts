import cloneDeep from 'lodash/cloneDeep';

const arrayOrDefault = <T>(arr?: Array<T>, defaultArr: Array<T> = []) => {
  return arr instanceof Array && arr.length > 0 ? cloneDeep(arr) : cloneDeep(defaultArr);
};
export default arrayOrDefault;
